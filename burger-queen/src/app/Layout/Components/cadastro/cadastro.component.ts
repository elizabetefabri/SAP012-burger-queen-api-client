import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/Services/Users/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  registerForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private user: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  )  {
    this.registerForm = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.emailMatchValidator });
  }

  emailMatchValidator(formGroup: FormGroup): { [s: string]: boolean } | null {
    if (formGroup.get('email')!.value !== formGroup.get('confirmEmail')!.value) {
      return { emailMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password, role } = this.registerForm.value;
      this.user.registerUser({ name, email, password, role }).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }
}
