import { Component, inject } from '@angular/core'; // Agregamos 'inject'
import { MatButton, MatAnchor } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Router, RouterLink } from "@angular/router";
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { AuthenticationService } from "../../../auth/services/authentication.service"; // Importante

@Component({
  selector: 'app-header-acquirer',
  standalone: true,
  imports: [
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatAnchor,
    RouterLink,
    LanguageSwitcherComponent
  ],
  templateUrl: './header-acquirer.component.html',
  styleUrl: './header-acquirer.component.css'
})
export class HeaderAcquirerComponent {

  // Inyectamos los servicios necesarios
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  options = [
    {path: '/home', title: 'Home'},
    {path: '/interactiveMap', title: 'Map'},
    {path: '/filter', title: 'Filter'},
    {path: '/plans', title: 'Plans'}
  ];

  // Función real de Logout
  onLogout() {
    this.authService.signOut(); // Borra el token (asegúrate que tu servicio tenga este método, o usa localStorage.removeItem('token'))
    this.router.navigate(['/sign-in']); // Redirige al login limpio
  }
}
