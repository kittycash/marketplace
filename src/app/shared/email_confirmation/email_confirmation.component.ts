import { Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

import { KittiesService } from '../kitties.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

import { CountdownComponent } from './countdown.component';

import { Kitty } from '../models/kitty.model';
import { Reservation } from '../models/reservation.model';
import { Entry } from '../models/kitty_api/entry.model';
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
  QRType: string = 'img';
  
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
    this.kittiesService.getKitty({kitty_id: this.currentKitty.reservation_data.kitty_id})
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: Entry) => { 
        let kitty = Object.assign(new Kitty(), res.entry);
        if (kitty && kitty.reservation && kitty.reservation == "delivered")
        {
          alert("Kitty reserved!  Do we want to animate into the wallet or something cool?");
          this.clearReservation();
          this.currentKitty.reservation_data = {step: 'confirm_email'};
          this.kittiesService.unsetCurrentKitty();
        }
        else
        {
          alert("Payment has not been received.  Please try again in a few minutes.");
        }
      });
  }
  
  sendCode(){
    this.kittiesService.request_code(this.sendCodeForm.value)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((success: boolean) => { 
        if (success)
        {
          this.createConfirmForm(this.sendCodeForm.value.email);
          this.currentKitty.reservation_data.coin_type = this.sendCodeForm.value.coin_type;
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
          this.currentKitty.reservation_data.code = this.confirmCodeForm.value.code;
          this.storeReservation();
          this.reserve();
        }     
        else
        {
          this.codeError = true;
        }
    });
  }

  reserve() {
    this.kittiesService.reserve({
      user_address: "1MDVejCgkinohyEPqpXUsZsvfG96vAtqT2", 
      kitty_id: this.currentKitty.reservation_data.kitty_id, 
      coin_type: this.currentKitty.reservation_data.coin_type, 
      verification_code: this.currentKitty.reservation_data.code
    })
    .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: any) => { 
        let reservation = Object.assign(new Reservation(), res); 

        if (reservation)
        {
          this.currentKitty.reservation_data.reservation = reservation;
          this.currentKitty.reservation_data.step = "confirm_payment";
          this.storeReservation();
        }
       
      });
  }
  private createSendCodeForm() {

  	this.sendCodeForm = this.formBuilder.group({
        email: ['', Validators.required],
        kitty_id: [this.currentKitty.kitty_id, Validators.required],
        recaptcha: ['', Validators.required],
        coin_type: ['', Validators.required]
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

