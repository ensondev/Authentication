import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStateService } from '../../../shared/services/auth-state.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styles: ``,
  styleUrl: './log-in.css'
})
export default class LogIn implements OnDestroy {
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _authState = inject(AuthStateService);
  private _subscription: Subscription | null = null;

  form = this._formBuilder.group({
    username: this._formBuilder.nonNullable.control('', Validators.required),
    password: this._formBuilder.nonNullable.control('', Validators.required)
  });

  submit() {
    if (this.form.invalid) return;
    
    const {username, password} = this.form.getRawValue();
    
    // Limpia suscripción anterior si existe
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    
    this._subscription = this._authService.logIn(username, password).subscribe({
      next: (response: any) => {
        if (response.p_status && response.p_data?.token) {
          this._router.navigate(['/home']); // Usa navigate en lugar de navigateByUrl
        } else {
          console.error('Token no recibido en la respuesta', response);
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  ngOnDestroy() {
    // Limpia la suscripción cuando el componente se destruye
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}