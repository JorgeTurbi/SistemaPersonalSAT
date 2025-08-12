import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ArrowLeft, Calendar, MapPin, User, MessageSquare,
  Clock, CheckCircle, XCircle, AlertCircle, LucideAngularModule
} from 'lucide-angular';

import { MessageDto, Visibility } from '../../Interface/messages.models';
import { MessagesServiceComponent } from './messageServices/messages.serviceComponent';
import { AuthService, SessionInfo } from '../Auth/Services/auth-service';
import { DataResponse } from '../../Interface/Response';
import { IEstado } from '../../Interface/IEstado';
import { IAsignacionMensaje } from '../../Interface/IAsignacionMensaje';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './mensaje.html',
  styleUrls: ['./mensaje.css'],
})
export class Mensaje implements OnInit {
  // Iconos
  ArrowLeft = ArrowLeft; Calendar = Calendar; MapPin = MapPin; User = User;
  MessageSquare = MessageSquare; Clock = Clock; CheckCircle = CheckCircle;
  XCircle = XCircle; AlertCircle = AlertCircle;

  // Sesión
  session: SessionInfo | null = null;

  // Datos header (vienen del API) — inicializado en null para usar guard en el template
  applicationData: IAsignacionMensaje | null = null;

  // Estado UI (mensajes paginados)
  messages: MessageDto[] = [];
  page = 1;
  pageSize = 10;
  totalCount = 0;

  // Cajas de respuesta
  replyBoxes: Record<number, boolean> = {};
  replyText: Record<number, string | undefined> = {};
  newMessageText = '';

  // Selects para nuevo mensaje
  typeId = 1; // Info por defecto
  visibility: Visibility = Visibility.ParticipantsOnly;
  recipientUserId: number | null = null;

  // Exponer enum al template
  Visibility = Visibility;

  // Catálogo rápido (si aún no tienes endpoint)
  messageTypes = [
    { id: 1, name: 'Info' },
    { id: 2, name: 'Interview' },
    { id: 3, name: 'Feedback' },
    { id: 4, name: 'Decision' },
  ];
  visibilities = [
    { id: Visibility.Public, label: 'Público' },
    { id: Visibility.ParticipantsOnly, label: 'Solo participantes' },
    { id: Visibility.PrivateToRecipient, label: 'Privado (DM)' },
  ];

  // Estados
  estado: IEstado[] = [];
  private idToNombre = new Map<number, string>(); // 1 -> "Pendiente", etc.

  // Iconos/clases por estadoId
  private estadoIcons: Record<number, string> = {
    1: 'lucide-clock',
    2: 'lucide-alert-circle',
    3: 'lucide-check-circle',
    4: 'lucide-x-circle',
    5: 'lucide-calendar',
  };
  private estadoClasses: Record<number, string> = {
    1: 'bg-gray-100 text-gray-800',
    2: 'bg-blue-100 text-blue-800',
    3: 'bg-green-100 text-green-800',
    4: 'bg-red-100 text-red-800',
    5: 'bg-green-100 text-green-800',
  };

  isLogin = false;
  public Math = Math;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private svc: MessagesServiceComponent,
    private message: MessageService

  ) { }

  ngOnInit(): void {
    // login flags
    this.auth.isLoggedIn$.subscribe((logged) => (this.isLogin = logged));
    this.auth.checkSession().subscribe();
    this.auth.sessionInfo$.subscribe((s) => (this.session = s ?? null));

    // estados
    this.getListEstados();

    // lee el id de la ruta y luego consulta asignación
    const idParam = this.route.snapshot.paramMap.get('id');
    const aplicanteId = idParam ? Number(idParam) : NaN;

    if (!aplicanteId || Number.isNaN(aplicanteId)) {
      console.error('ID de aplicante inválido en la ruta.');
      return;
    }

    this.svc.consultaAplicante(aplicanteId).subscribe({
      next: (res: DataResponse<IAsignacionMensaje>) => {
        if (res.success && res.data) {
          this.applicationData = res.data;

          // ahora que tenemos el ID, cargar mensajes
          // OJO: si tu backend de mensajes usa ApplicationId (no AplicanteId),
          // reemplaza por el campo correcto aquí.
          const applicationId = aplicanteId; // ajusta si corresponde
          this.loadMessages(applicationId);
        } else {
          const UserId: number = Number(this.session?.userId);
          this.svc.consultaAplicantebyUser(UserId).subscribe({
            next: (res: DataResponse<IAsignacionMensaje>) => {
              if (res.success) {
                this.applicationData = res.data;
                this.message.add({ severity: 'success', summary: 'success', detail: res.message });
              }
              else
              {
                   this.message.add({ severity: 'error', summary: 'error', detail: "error" });
              }

            },
            error: (err: any) => {
            this.message.add({ severity: 'error', summary: 'error', detail: "error" });
            }
          });

        }
      },
      error: (err: any) => {
        console.error('', err);
        this.message.add({ severity: 'error', summary: 'error', detail: 'consultaAplicante error' });
      }
    });
  }

  // ======================
  // Paginación
  // ======================
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  private loadMessages(applicationId: number) {
    if (!applicationId) return;
    this.svc.getMessages(applicationId, this.page, this.pageSize)
      .subscribe({
        next: res => {
          this.messages = res.items;
          this.page = res.page;
          this.pageSize = res.pageSize;
          this.totalCount = res.totalCount;
        },
        error: err => console.error('getMessages error', err)
      });
  }

  onPageChange(next: number) {
    const last = Math.max(1, Math.ceil(this.totalCount / this.pageSize));
    if (next < 1 || next > last) return;

    this.page = next;

    // vuelve a pedir con el id correcto
    const idParam = this.route.snapshot.paramMap.get('id');
    const applicationId = idParam ? Number(idParam) : 0;
    this.loadMessages(applicationId);
  }

  // ======================
  // Responder / UI
  // ======================
  toggleReplyBox(messageId: number) {
    this.replyBoxes[messageId] = !this.replyBoxes[messageId];
  }

  cancelReply(messageId: number) {
    this.replyText[messageId] = '';
    this.replyBoxes[messageId] = false;
  }

  addReply(messageId: number) {
    const text = (this.replyText[messageId] || '').trim();
    if (!text) return;

    const idParam = this.route.snapshot.paramMap.get('id');
    const applicationId = idParam ? Number(idParam) : 0;

    this.svc.createReply(applicationId, messageId, { text })
      .subscribe(() => {
        this.replyText[messageId] = '';
        this.replyBoxes[messageId] = false;
        this.loadMessages(applicationId);
      });
  }

  // ======================
  // Nuevo mensaje
  // ======================
  get isAdmin(): boolean {
    return (this.session?.role ?? '').toLowerCase() === 'admin';
  }

  addNewTopLevelMessage() {
    const text = (this.newMessageText || '').trim();
    if (!text) return;

    const idParam = this.route.snapshot.paramMap.get('id');
    const applicationId = idParam ? Number(idParam) : 0;
    if (!applicationId) return;

    const body: any = {
      text,
      typeId: this.typeId,
      visibility: Number(this.visibility)
    };

    if (this.visibility === Visibility.PrivateToRecipient) {
      const userId = this.session?.userId ? Number(this.session.userId) : null;
      body.recipientUserId = this.recipientUserId ?? userId;
    }

    this.svc.createMessage(applicationId, body).subscribe(() => {
      this.newMessageText = '';
      this.loadMessages(applicationId);
    });
  }

  // ======================
  // Estados
  // ======================
  getStatusLabelById(statusId: number): string {
    return this.getStatusLabel(statusId);
  }
  getStatusClass(statusId: number): string {
    return this.getStatusClassById(statusId);
  }
  getStatusIcon(statusId: number): string {
    return this.getStatusIconById(statusId);
  }

  getStatusLabel(statusId: number): string {
    if (!this.idToNombre?.has(statusId)) return statusId.toString();
    return this.idToNombre.get(statusId)!;
  }
  getStatusClassById(estadoId: number): string {
    return this.estadoClasses[estadoId] ?? 'bg-gray-100 text-gray-800';
  }
  getStatusIconById(estadoId: number): string {
    return this.estadoIcons[estadoId] ?? 'lucide-clock';
  }

  getListEstados() {
    this.auth.ListEstados().subscribe({
      next: (res: DataResponse<IEstado[]>) => {
        if (res.success && res.data) {
          this.estado = res.data;
          this.idToNombre.clear();
          for (const e of this.estado) {
            this.idToNombre.set(e.id, e.nombre);
          }
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  // ======================
  // Icono por tipo de mensaje
  // ======================
  getMessageIcon(typeId: number): string {
    switch (typeId) {
      case 2: return 'lucide-calendar text-green-600';        // Interview
      case 3: return 'lucide-message-square text-blue-600';   // Feedback
      case 4: return 'lucide-check-circle text-purple-600';   // Decision
      default: return 'lucide-alert-circle text-gray-600';    // Info
    }
  }
}
