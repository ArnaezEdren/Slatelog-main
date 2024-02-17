import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormData } from '../model/login-view.model';
import { BasicAuthService } from '../../../../../data/auth/src';
import { RegisterComponent } from '../register/register.component';
import { UserLoginCommand } from '../../../../../data/user/src';

// Smart Container which connects to a Service or Store.
// -> See also login.component.ts
@Component({
  selector: 'frontend-login-container',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  template: ` <frontend-login (login)="onLogin($event)"></frontend-login>`,
  styles: [],
})
export class LoginContainerComponent {
  authService = inject(BasicAuthService);

  onLogin(formData: LoginFormData) {
    const command: UserLoginCommand = formData;

    this.authService.login(command);
  }
}
