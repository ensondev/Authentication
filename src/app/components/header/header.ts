import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBars,
  faHouse,
  faUsers,
  faHandshakeAngle,
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
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../shared/services/auth-state.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    NgIf,
    FontAwesomeModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  usuario: string = '';
  rol: string = '';
  iniciales: string = '';

  private router = inject(Router);

  constructor(private authState: AuthStateService) {
    const session = this.authState.getSession();
    if (session) {
      this.usuario = session.usuario;
      this.rol = session.rol;
      this.iniciales = this.obtenerIniciales(session.usuario);
    }
  }

  obtenerIniciales(nombre: string): string {
    const palabras = nombre.trim().split(' ');
    if (palabras.length === 1) return palabras[0].substring(0, 2).toUpperCase();
    return (palabras[0][0] + palabras[1][0]).toUpperCase();
  }

  isDonacionesOpen = false;
  isInventarioOpen = false;

  toggleSubmenu(menu: string) {
    if (menu === 'donaciones') {
      this.isDonacionesOpen = !this.isDonacionesOpen;
    } else if (menu === 'inventario') {
      this.isInventarioOpen = !this.isInventarioOpen;
    }
  }

  // Iconos
  faBars = faBars;
  faHouse = faHouse;
  faUsers = faUsers;
  faHandshakeAngle = faHandshakeAngle;
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

  isMenuOpen = signal(false);

  toggleMenu() {
    requestAnimationFrame(() => {
      this.isMenuOpen.update(prev => !prev);
    });
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  logout() {
    this.authState.signOut();
    this.router.navigate(['/auth/log-in']);
  }
}
