import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoggedIn = true;
  isLoading = false;
  error: string = null

  constructor(private authService: AuthService, private router: Router) { }
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponse>

    if (this.isLoggedIn) {
      authObs = this.authService.login(email, password)
      this.router.navigate(['/recipes'])
    } else {
      authObs = this.authService.signUp(email, password)
      this.router.navigate(['/recipes'])
    }
    authObs.subscribe(resData => {
      console.log(resData)
      this.isLoading = false
    },
      errorMessage => {
        this.error = errorMessage
        this.isLoading = false
      })
    form.reset()
  }

}
