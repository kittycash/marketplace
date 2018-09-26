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
  explore: (f: PagingContext) => `/v1/kitties?order=${f.order}&offset=${f.page.start_index}&page_size=${f.page.page_size}`,
  boxes: (b: BoxesContext) => `/v1/kitty/entries?open=false&price_btc=${b.btc_filter}&price_sky=${b.sky_filter}&order=${b.order}&offset=${b.page.start_index}&page_size=${b.page.page_size}`,
  kitty: (k: KittyContext) => `/v1/kitty/${k.kitty_id}`,
  forsale: () => `/fakekitty/forsale/all`,
  forsire: () => `/fakekitty/forsire/all`,
  details: (k: KittyContext) => `/iko/kitty/${k.kitty_id}`,
  request_code: () => `/verification/request_code`,
  verify_code: () => `/verification/verify_code`,
  cancel_code: () => '/verification/cancel_code/',
  reserve: () => `/teller/reserve`
};

export interface PagingContext {
  order: string;
  page: any;
}


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

   private walletUrl: string = 'http://127.0.0.1:6148/';
   traits: any = false;

  constructor(
    private http: Http, 
    private i18nService: I18nService) {

      this.getTraits().subscribe(traits => {
        this.traits = traits;  
      });

    }

  setCurrentKitty(kitty: object) {
    this.kittySource.next(kitty)
  }

  unsetCurrentKitty(){
    this.kittySource.next(false);
  }

  getExplore(context: PagingContext, filters: any): Observable<object> {
    return this.http.get(routes.explore(context), this.prepareOptions({cache: false, params: filters}))
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => {
          return this.displayError('Error, could not load kitties')
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
        map(body => body.entry),
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


   getTraits(): Observable<any> {
      return this.http.get('/v1/traits', this.prepareOptions())
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => {
          return this.displayError('Error, could not load your kitty details')
        })
      );
  }

   private getQueryString(parameters:any = null) {
    if (!parameters) {
      return '';
    }

    return Object.keys(parameters).reduce((array,key) => {
      array.push(key + '=' + encodeURIComponent(parameters[key]));
      return array;
    }, []).join('&');
  }

  private getUrl(url:any, options:any = null) {
      return this.walletUrl + url + '?' + this.getQueryString(options);    
  }



  traitImage(icon:string)
  {
    return this.walletUrl + icon;
  }

  lookup(phenotypes:any)
  {
    let formatted_traits = [];

    for (let property in phenotypes) {     
      if (phenotypes.hasOwnProperty(property)) {
          
          let formatted_property = this.camelCaseTo_underscore(property);

          if (this.traits.hasOwnProperty(formatted_property) && this.validPropertyForColorScheme(formatted_property, phenotypes.body_color_scheme))
          {
            let trait_container = this.traits[formatted_property];

            let trait_id = phenotypes[property];

            if (trait_container && Number.isInteger(trait_id) && trait_container[trait_id])
            {
              //Add the trait type
              let t = trait_container[trait_id];
              t.type = formatted_property;
              formatted_traits.push(t);  
            }
          }
      }
  }

    return this.sortTraits(formatted_traits);
  }

  private validPropertyForColorScheme(property:any, color_scheme:any)
  {
    let valid = true;

    if (color_scheme == 'mono_a')
    {
      switch(property) {
        case 'body_color_b':
            valid = false;
            break;
        case 'body_color_c':
            valid = false;
            break;
        case 'body_pattern':
            valid = false;
            break
      }
    }

    if (color_scheme == 'mono_b')
    {
      switch(property) {
        case 'body_color_a':
            valid = false;
            break;
        case 'body_pattern':
            valid = false;
            break;
      }
    }

    if (color_scheme == 'dual_a')
    {
      switch(property) {
        case 'body_color_b':
            valid = false;
            break;
        case 'body_pattern':
            valid = false;
            break;
      }
    }

    if (color_scheme == 'dual_b')
    {
      switch(property) {
        case 'body_color_a':
            valid = false;
            break;
        case 'body_pattern':
            valid = false;
            break;
      }
    }

    return valid;
  }

  private sortTraits(traits:any)
  {
    let trait_order = ['body_attr', 'body_pattern', 'eye_attr', 'nose_attr', 'tail_attr'];

    let result = traits.map(function(trait:any) {
        var s = trait_order.indexOf(trait.type);
        //If the trait isn't defined, push to the bottom of the array
        if (s <= 0)
        {
          s = 1000;
        }
        trait_order[s] = '';
        return [s, trait]
    }).sort().map(function(o:any) { return o[1] });

    return result;
  }

  private camelCaseTo_underscore(key:any)
  {
    return key.replace(/(?:^|\.?)([A-Z])/g, function (x:any,y:any){return "_" + y.toLowerCase()}).replace(/^_/, "");
  }
}
