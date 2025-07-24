import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditProfileDialogComponent } from "../EditProfile/edit-profile-dialog-component";
import { LucideAngularModule, PlusCircleIcon } from 'lucide-angular';

@Component({
  selector: 'app-profilecomponent',
   standalone: true,
  imports: [CommonModule, EditProfileDialogComponent,LucideAngularModule],
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css'
})

  export class Profilecomponent {
  activeTab = 'profile';
    showEditDialog = false;
    Plus=PlusCircleIcon;

  abrirEditor() {
    this.showEditDialog = !this.showEditDialog;
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
