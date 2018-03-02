import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()

export class FocusService {
    private subject = new Subject<any>();
 
    sendFocus(focusIndex: number) {
        this.subject.next({ focusIndex: focusIndex });
    }
 
    getFocus(): Observable<any> {
        return this.subject.asObservable();
    }
}