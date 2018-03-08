import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { extend } from 'lodash';
import { I18nService } from '../core/i18n.service';

const routes = {
  explore: () => `/explore/all`,
  boxes: () => `/boxes/all`,
  forsale: () => `/forsale/all`,
  forsire: () => `/forsire/all`,
  mykitties: (u: UserContext) => `/user/${u.user_id}/mine`,
  details: (k: KittyContext) => `/iko/kitty/${k.kitty_id}`
};

export interface UserContext {
  // The user's identifier
  user_id: number;
}

export interface KittyContext {
  // The user's identifier
  kitty_id: number;
}

@Injectable()
export class KittiesService {

  constructor(private http: Http, private i18nService: I18nService) {}

  getExplore(): Observable<object> {
    return this.http.get(routes.explore(), this.getOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => of('Error, could not load boxes'))
      );
  }

  getBoxes(): Observable<object> {
    return this.http.get(routes.boxes(), this.getOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => of('Error, could not load boxes'))
      );
  }

  getForSale(): Observable<object> {
    return this.http.get(routes.forsale(), this.getOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => of('Error, could not load kittens'))
      );
  }

  getForSire(): Observable<object> {
    return this.http.get(routes.forsire(), this.getOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => of('Error, could not load kittens'))
      );
  }

  getMyKitties(context: UserContext): Observable<object> {
    return this.http.get(routes.mykitties(context), this.getOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => of('Error, could not load your kitties'))
      );
  }

  getDetails(context: KittyContext): Observable<object> {
    return this.http.get(routes.details(context), this.getOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => of('Error, could not load your kitty details'))
      );
  } 

  private getOptions() {

    let headers = new Headers();
    headers.append('Accept-Language', this.getLanguage());
    let opts = new RequestOptions({cache: true});
    opts.headers = headers;
    
    return opts
  }

  private getLanguage() {
    const language = this.i18nService.language ? this.i18nService.language : 'en-Us';

    return language;

    //this.http.defaultOptions.headers.set("", language);
  } 
}
