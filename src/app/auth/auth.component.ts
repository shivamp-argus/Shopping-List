import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoggedIn = true;
  isLoading = false;
  error: string = null
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
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
      AlertComponent
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
        this.showErrorAlert(errorMessage);
        this.isLoading = false
      })
    form.reset()
  }
  // onHandleError() {
  //   this.error = null
  // }
  private showErrorAlert(errorMessage: string) {
    const alertCmp = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    const componentRef = hostViewContainer.createComponent(alertCmp)
    componentRef.instance.message = errorMessage
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainer.clear()
    })
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
