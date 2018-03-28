import { Routes } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

import { environment } from '../../environments/environment';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the shell component.
   * @param routes The routes to add.
   * @return {Routes} The new routes using shell as the base.
   */
  static withShell(routes: Routes): Routes {
    return [{
      path: '',
      component: environment.showShell ? ShellComponent : null,
      children: routes,
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
  }];
  }

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return {Routes} The new routes using shell as the base.
   */
  static withAuthenticatedShell(routes: Routes): Routes {
    return [{
      path: '',
      component: environment.showShell ? ShellComponent : null,
      children: routes,
      canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
  }];
  }

}
