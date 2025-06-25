import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscriber } from 'rxjs';

interface SignUpForm {
  nombre_usuario: FormControl<string>;
  rol_usuario: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export default class SignUp {
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  form = this._formBuilder.group<SignUpForm>({
    nombre_usuario: this._formBuilder.nonNullable.control('', Validators.required),
    rol_usuario: this._formBuilder.nonNullable.control('', Validators.required),
    password: this._formBuilder.nonNullable.control('', Validators.required)
  });

  submit(){
    if(this.form.invalid) return;

    const {nombre_usuario, rol_usuario, password} = this.form.getRawValue();

    this._authService.signUp(nombre_usuario, rol_usuario, password).subscribe({
      next: (response) => {
       /*  this._router.navigateByUrl('/home') */
      },
      error: (error) => console.log(error),
      
    })
  }
}