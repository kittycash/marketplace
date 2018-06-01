import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { map, catchError } from 'rxjs/operators';
import { extend } from 'lodash';
import { I18nService } from '../core/i18n.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const routes = {
  explore: () => `/fakekitty/explore/all`,
  boxes: (b: BoxesContext) => `/kitty/entries?open=false&price_btc=${b.btc_filter}&price_sky=${b.sky_filter}&order=${b.order}&offset=${b.page.start_index}&page_size=${b.page.page_size}`,
  kitty: (k: KittyContext) => `/kitty/entry?kitty_id=${k.kitty_id}`,
  forsale: () => `/fakekitty/forsale/all`,
  forsire: () => `/fakekitty/forsire/all`,
  details: (k: KittyContext) => `/iko/kitty/${k.kitty_id}`,
  request_code: () => `/verification/request_code`,
  verify_code: () => `/verification/verify_code`,
  cancel_code: () => '/verification/cancel_code/',
  reserve: () => `/teller/reserve`
};

export interface BoxesContext {
  btc_filter: string;
  sky_filter: string;
  order: string;
  page: any;
}

export interface UserContext {
  // The user's identifier
  user_id: number;
}

export interface KittyContext {
  // The user's identifier
  kitty_id: number;
}

export interface RequestCodeContext {
  email: string;
  kitty_id: string;
  recaptcha: string;
}

export interface VerifyCodeContext {
  email: string;
  kitty_id: string;
  code: string;
}

export interface ReservationContext {
  user_address: string;
  kitty_id: string;
  coin_type: string;
  verification_code: string;
}

@Injectable()
export class KittiesService {

  private kittySource = new BehaviorSubject<any>(false);
  currentKitty = this.kittySource.asObservable();

  constructor(private http: Http, private i18nService: I18nService) {}

  setCurrentKitty(kitty: object) {
    this.kittySource.next(kitty)
  }

  unsetCurrentKitty(){
    this.kittySource.next(false);
  }

  getExplore(): Observable<object> {
    return this.http.get(routes.explore(), this.prepareOptions({cache: false}))
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => {
          return this.displayError('Error, could not load boxes')
        })
      );
  }

  getBoxes(context: BoxesContext): Observable<object> {
    return this.http.get(routes.boxes(context), this.prepareOptions({cache: false}))
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => {
          return this.displayError('Error, could not load boxes')
        })
      );
  }

  getKitty(context: KittyContext): Observable<object> {
    return this.http.get(routes.kitty(context), this.prepareOptions({cache: false}))
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => {
          return this.displayError('Error, could not load kitty')
        })
      );
  }

  getForSale(): Observable<object> {
    return this.http.get(routes.forsale(), this.prepareOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => {
          return this.displayError('Error, could not load kittens')
        })
      );
  }

  getForSire(): Observable<object> {
    return this.http.get(routes.forsire(), this.prepareOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => {
          return this.displayError('Error, could not load kittens')
        })
      );
  }

  getDetails(context: KittyContext): Observable<object> {
    return this.http.get(routes.details(context), this.prepareOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.data),
        catchError(() => {
          return this.displayError('Error, could not load your kitty details')
        })
      );
  } 

  request_code(context: RequestCodeContext): Observable<string | boolean> {
    return this.http.post(routes.request_code(), context, this.prepareOptions({cache: false}))
      .pipe(
        map((res: Response) => {
          if (res && res.status === 201)
          {
            return true;
          }
          else
          {
            return false;
          }
        
        }),
        catchError(() => of(false))
      );
  } 

  verify_code(context: VerifyCodeContext): Observable<string | boolean> {
    return this.http.post(routes.verify_code(), context, this.prepareOptions({cache: false}))
      .pipe(
        map((res: Response) => {
          if (res && res.status === 204)
          {
            return true;
          }
          else
          {
            return false;
          }
         
        }),
        catchError(() => of(false))
      );
  } 



  reserve(context: ReservationContext): Observable<any> {
    return this.http.post(routes.reserve(), context, this.prepareOptions({cache: false}))
      .pipe(
        map((res: any) => res.json()),
        catchError((error: any) => { 
          return this.displayError(error._body);
      })
      );
  } 


  private displayError(error:any) : any
  {
    //Fire the error to the tabs controller
    let event = new CustomEvent('showGlobalError', { cancelable: true, detail: {message: error} }); 
    //Check the see if any event handler cancels the event
    if (document.dispatchEvent(event))
    {
      //The tabs listener isn't there.  Send it out from this app;
      alert("API Error: " + error);
    }
    
    return [];
  }

  private prepareOptions(data?:any) {

    let headers = new Headers();
    headers.append('Accept-Language', this.getLanguage());

    var options = extend({cache: true, headers: headers}, data);
    return options;
  }

  private getLanguage() {
    const language = this.i18nService.language ? this.i18nService.language : 'en-Us';

    return language;

    //this.http.defaultOptions.headers.set("", language);
  } 
}
