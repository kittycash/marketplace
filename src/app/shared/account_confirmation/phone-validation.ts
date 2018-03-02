import { AbstractControl } from '@angular/forms';

export class PhoneValidation {

    static validate(AC: AbstractControl): any {
    
       let phoneNumber = AC.value; // Get the input value
       //Regex to validate an international phone number
       let regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

	   if (regex.test(phoneNumber)) {
	        // Valid international phone number
	        return null;
	    } else {
	        // Invalid international phone number
	        return {phoneNumber: {
         	 invalidNumber: phoneNumber
        	}}
	    }
    }
}