import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;
  loginMessage: string | null = null;

  helper = new JwtHelperService();

  constructor(private loginSrv: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loginSrv.login(this.loginForm.value).subscribe(
      (res: string) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res);

        const decodedToken = this.helper.decodeToken(res);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'ManagerMent') {
          this.router.navigate(['/home']);
          this.loginSuccess.emit();
        } else {
          this.loginMessage = 'Tài khoản không có quyền truy cập vào Admin Panel.';
          localStorage.removeItem('token');
        }
      },
      (error: any) => {
        console.error(error);
        this.loginMessage = error.error?.message || 'Email hoặc mật khẩu không đúng.';
        localStorage.removeItem('token');
      }
    );
  }
}
