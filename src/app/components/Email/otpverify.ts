import { Component } from '@angular/core';
import { OtpService } from '../../servicioOtp/otp.service';
import { SendOtpRequest, VerifyOtpRequest } from '../../Interface/otp.models';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-otpverify',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './otpverify.html',
  styleUrl: './otpverify.css'
})
export class Otpverify {
  email = '';
  code = '';

  constructor(private otp: OtpService, private message: MessageService, private router:Router) { }

  sendOtp() {
    const body: SendOtpRequest = { email: this.email.trim() };
    if (!body.email) return;

    this.otp.send(body).subscribe({
      next: res => {
        this.message.add({ severity: 'success', summary: 'Activacion', detail: res.message + (res.devCode ? ` (DEV: ${res.devCode})` : '') });

      },
      error: (err: any) => {
        this.message.add({ severity: 'error', summary: 'error', detail: (err?.error?.message || 'Error enviando OTP') });
      }

    });
  }

  onVerify() {
    const body: VerifyOtpRequest = { email: this.email.trim(), code: this.code.trim() };
    if (!body.email || !body.code) return;

    this.otp.verify(body).subscribe({
      next: res =>{
            this.message.add({ severity: 'success', summary: 'Activacion', detail: res.message  });
            this.router.navigate(['/login']);

      },
      error:(err:any) =>
      {
           this.message.add({ severity: 'error', summary: 'error', detail: (err?.error?.message || 'Error verificando OTP') });

      }

    });
  }
}
