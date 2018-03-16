import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Logger, I18nService, AuthenticationService } from '../core';

import { PasswordValidation } from './password-validation';

const log = new Logger('Register');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  version: string = environment.version;
  error: string;
  registerForm: FormGroup;
  isLoading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  register() {
    this.isLoading = true;
    this.authenticationService.register(this.registerForm.value)
      .pipe(finalize(() => {
        this.registerForm.markAsPristine();
        this.isLoading = false;
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.email} successfully registered`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        log.debug(`Registration error: ${error}`);
        this.error = error;
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

}
