import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';
import { KittiesService } from '../../../shared/kitties.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuHidden = true;
  currentKitty: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              private kittiesService: KittiesService) { }

  ngOnInit() { 
    this.kittiesService.currentKitty.subscribe(kitty => this.currentKitty = kitty);
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get authenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  get confirmed(): boolean {
    return this.authenticationService.isConfirmed();
  }
  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get email(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.email : null;
  }

}
