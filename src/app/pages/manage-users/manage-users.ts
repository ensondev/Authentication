import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HomeService } from '../home/services/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css'
})
export class ManageUsers implements OnInit {

  users: any[] = [];
  currentPage = 1;
  usersPerPage = 10;
  totalUsers = 0;
  isLoading = true;
  Math = Math; // Para usar en la plantilla

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.homeService.getUsers(this.currentPage, this.usersPerPage)
      .subscribe({
        next: ({users, totalUsers}) => {
          this.users = users;
          this.totalUsers = totalUsers;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.isLoading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.homeService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}
