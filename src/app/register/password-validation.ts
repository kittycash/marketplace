import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl): any {
       let password = AC.get('password').value; // Get the password input value
       let passwordConfirm = AC.get('passwordConfirm').value; // get the passwordConfirm input value
        if(password != passwordConfirm) {
            AC.get('passwordConfirm').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}