import { Component, signal } from '@angular/core';
import { RouterModule,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  openProfil() {
    // Logique pour ouvrir le profil
    console.log('Profil ouvert');
    alert('Profil ouvert');
  }
}

