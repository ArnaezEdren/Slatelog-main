import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterFormData } from '../model/register-view.model';
import { BasicAuthService } from '../../../../../data/auth/src';
import { Router } from '@angular/router';


// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
@Component({
  selector: 'frontend-register-container',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  template: `<frontend-register (register)="onRegister($event)"></frontend-register>`,
  styles: [],
})
export class RegisterContainerComponent {
  authService = inject(BasicAuthService);
  router = inject(Router);

  onRegister(formData: RegisterFormData) {
    const { passwordConfirm, ...command } = formData;

    // const registrationCommand = command as UserRegistrationCommand;

    this.authService.register(command).then(()=> {
      this.router.navigate(['/auth/login']);
    })
      .catch((error) => {
        console.error('Register failed:', error);
      });
  }
}
