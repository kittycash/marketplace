import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../core/authentication/authentication.service';

import { PhoneValidation } from './phone-validation';

@Component({
  selector: 'account-confirmation',
  templateUrl: './account_confirmation.component.html',
  styleUrls: ['./account_confirmation.component.scss']
})

export class AccountConfirmationComponent implements OnInit {

  //Initialize an empty array with null values for the length of the code
  codeLength: number = 6;
  sendCodeForm: FormGroup;
  confirmCodeForm: FormGroup;
  formComponents: Array<number>;

  doConfirm: boolean = false;

  constructor(private router: Router,
  			  private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) { 
  	
  	this.createSendCodeForm();
  	this.createConfirmForm();

  	//Create an empty array to loop the compontnets
  	this.formComponents = Array(this.codeLength).fill(0).map((x,i)=>i);
  }

  ngOnInit() {
  }
  
  sendCode(){
  	//Send API call here to send the SMS
  	this.doConfirm = true;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  confirm() {
  	const $this = this;
  	
  	let code = Object.keys(this.confirmCodeForm.value).map(function(key){
	    return $this.confirmCodeForm.value[key];
	}).join('');

  	this.authenticationService.confirm({code: code})
  	   .subscribe(() => {
  	   		//Code is either confirmed or not from the api
  	   });
  }

  private createSendCodeForm() {
  	this.sendCodeForm = this.formBuilder.group({
        phoneNumber: ['', PhoneValidation.validate]
    });
  }

  private createConfirmForm() {

  	var form = {};
  	for (var i = 0; i < this.codeLength; i++)
  	{
  		form['code' + i] = ['', Validators.required];
  	}
    this.confirmCodeForm = this.formBuilder.group(form);

  }


}

