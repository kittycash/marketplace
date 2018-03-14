import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import { KittiesService } from '../kitties.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'email-confirmation',
  templateUrl: './email_confirmation.component.html',
  styleUrls: ['./email_confirmation.component.scss']
})

export class EmailConfirmationComponent implements OnInit {

  //Initialize an empty array with null values for the length of the code
  codeLength: number = 6;
  sendCodeForm: FormGroup;
  confirmCodeForm: FormGroup;
  formComponents: Array<number>;
  isLoading: boolean;
  doConfirm: boolean = false;
  currentKitty: any;

  constructor(private router: Router,
  			      private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private kittiesService: KittiesService ) { 
  	
 

  	//Create an empty array to loop the compontnets
  	this.formComponents = Array(this.codeLength).fill(0).map((x,i)=>i);
  }

  

  ngOnInit() {
    this.kittiesService.currentKitty.subscribe(kitty => {
      this.currentKitty = kitty;
      this.createSendCodeForm();
    });
  }
  
  sendCode(){
    this.kittiesService.request_code(this.sendCodeForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((success: boolean) => { 
        if (success)
        {
          this.createConfirmForm(this.sendCodeForm.value.email);
          this.doConfirm = true;
        }
        else
        {
          alert("Error requesting code.  I think this should come from the server");
        }
      });
  }

  cancel() {
    this.kittiesService.unsetCurrentKitty();
  }

  confirm() {
    this.kittiesService.verify_code(this.confirmCodeForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((success: boolean) => { 
        if (success)
        {
          alert("Code validated.  Send request to teller!");
        }     
        else
        {
          alert("Error validating code.  I think this should come from the server");
        }
    });
  }

  private createSendCodeForm() {

  	this.sendCodeForm = this.formBuilder.group({
        email: ['', Validators.required],
        kitty_id: [this.currentKitty.kitty_id, Validators.required],
        recaptcha: ['', Validators.required]
    });
  }

  private createConfirmForm(email:string) {
  	this.confirmCodeForm = this.formBuilder.group({
        email: [email, Validators.required],
        kitty_id: [this.currentKitty.kitty_id, Validators.required],
        code: ['', Validators.required]
    });

  }


}

