import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { MatButtonModule } from "@angular/material/button"; // Importa el modulo completo
import { MatCardModule } from "@angular/material/card";     // Para que se vea bonito en una tarjeta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './authentication-section.component.html',
  styleUrl: './authentication-section.component.css'
})
export class AuthenticationSectionComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  // Navegar al Login
  onSignIn() {
    this.router.navigate(['/sign-in']); // O la ruta que uses para login
  }

  // Navegar al registro de Estudiantes
  onRegisterStudent() {
    this.router.navigate(['/registerUniversity']);
  }

  // Navegar al registro de Organizaciones
  onRegisterOrganization() {
    this.router.navigate(['/registerOrganization']);
  }
}
