// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  pseudoname = '';
  motDePass = '';
  showPassword = false;
  // popup states
  showEmptyPopup = false;
  showInvalidPopup = false;

  constructor(private auth: AuthService, public langService: LangService) {}

  submit() {
    if (!this.pseudoname.trim() || !this.motDePass.trim()) {
      this.showInvalidPopup = false;
      this.showEmptyPopup = true;
      return;
    }
    this.auth.login(this.pseudoname, this.motDePass).subscribe({
      next: () => {},
      error: () => {
        this.showEmptyPopup = false;
        this.showInvalidPopup = true;
      }
    });
  }

  togglePassword() { this.showPassword = !this.showPassword; }

  toggleLang() { this.langService.toggleLang(); }
  get t() { return this.langService.t; }
  get lang() { return this.langService.lang; }
}
