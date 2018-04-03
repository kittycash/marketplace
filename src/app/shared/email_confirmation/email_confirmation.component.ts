import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

import { KittiesService } from '../kitties.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

import { CountdownComponent } from './countdown.component';

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
  isLoading: boolean = false;
  doConfirm: boolean = false;
  doPayment: boolean = false;
  currentKitty: any;
  codeError: boolean = false;
  timerRemaining: number;
  currentCurrency: string = 'btc';
  QRType: string = 'img';
  paymentAddress: string = 'DdzFFzCqrhsykj9xNk4UjMABrJaitDmCM8MUbk8xJy6zmANigjB9HunWDjnPZWrjKYdPeHF6a3oiMpvdBP2xR6idZ5zqG4KkxVwvouoz';

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

      console.log(this.currentKitty);
      this.createSendCodeForm();

      if (this.currentKitty && this.currentKitty.reservation_data && this.currentKitty.reservation_data.step == 'confirm_code')
      {
        this.createConfirmForm(this.currentKitty.reservation_data.email);
      }
    });


  }
  
  resetCodeError(){
    this.codeError = false;
  }

  confirmPayment(){
    this.clearReservation();
    alert("Clearing local reservation storage.  Need teller working to confirm payment!");
    this.currentKitty.reservation_data = {step: 'confirm_email'};
    this.kittiesService.unsetCurrentKitty();
  }
  
  sendCode(){
    this.kittiesService.request_code(this.sendCodeForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((success: boolean) => { 
        if (success)
        {
          this.createConfirmForm(this.sendCodeForm.value.email);
          this.currentKitty.reservation_data.step = "confirm_code"; 
          this.currentKitty.reservation_data.kitty_id = this.sendCodeForm.value.kitty_id;
          this.currentKitty.reservation_data.email = this.sendCodeForm.value.email;
          this.storeReservation();
        }
        else
        {
          this.codeError = true;
        }
      });
  }

  cancel() {
    this.kittiesService.unsetCurrentKitty();
    //Todo - I should hit the verifcation service API with a cancel request here
    this.clearReservation();
  }

  clearReservation()
  {
    localStorage.removeItem('reservation_data');
  }
  storeReservation()
  {
    localStorage.setItem('reservation_data', JSON.stringify(this.currentKitty.reservation_data));
  }

  confirm() {
    this.kittiesService.verify_code(this.confirmCodeForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((success: boolean) => { 
        if (success)
        {
          let currentDate = new Date();
          this.timerRemaining = new Date(currentDate.getTime() + (30 * 60 * 1000)).getTime();
          this.currentKitty.reservation_data.step = "confirm_payment";
          this.storeReservation();
        }     
        else
        {
          this.codeError = true;
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

