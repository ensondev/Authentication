import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars,
  faHouse,
  faUsers,
  faHandshakeAngle,
  faNewspaper,
  faEnvelope,
  faDiagramProject,
  faBox,
  faBoxes,
  faReceipt,
  faCashRegister,
  faUserCog,
  faSignOutAlt,
  faChevronDown,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook,
  faInstagram, 
} from '@fortawesome/free-brands-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    FontAwesomeModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  // Iconos principales
  faBars = faBars;
  faHouse = faHouse;
  faUsers = faUsers;
  faHandshakeAngle = faHandshakeAngle;
  faNewspaper = faNewspaper;
  faEnvelope = faEnvelope;
  faDiagramProject = faDiagramProject;
  faBox = faBox;
  faBoxes = faBoxes;
  faReceipt = faReceipt;
  faCashRegister = faCashRegister;
  faUserCog = faUserCog;
  faSignOutAlt = faSignOutAlt;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  
  // Iconos de marcas (brands)
  faFacebook = faFacebook;
  faInstagram = faInstagram;

  // Estado del menú
  isMenuOpen = signal(false);
  activeSubmenu = signal<string | null>(null);

  // Datos del usuario (deberías obtenerlos de tu servicio de autenticación)
  userName = 'Administrador';
  userRole = 'Administrador';
  userInitials = this.getInitials(this.userName);

  toggleMenu() {
    this.isMenuOpen.update(prev => !prev);
    if (!this.isMenuOpen()) {
      this.activeSubmenu.set(null); // Cierra submenús al cerrar el menú principal
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.activeSubmenu.set(null);
  }

  toggleSubmenu(submenuKey: string) {
    if (this.activeSubmenu() === submenuKey) {
      this.activeSubmenu.set(null);
    } else {
      this.activeSubmenu.set(submenuKey);
    }
  }

  isSubmenuOpen(submenuKey: string): boolean {
    return this.activeSubmenu() === submenuKey;
  }

  private getInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }

  // Método para cerrar sesión (implementa según tu AuthService)
  logout() {
    console.log('Cerrar sesión');
    // this.authService.logout();
    // this.router.navigate(['/login']);
    this.closeMenu();
  }
}