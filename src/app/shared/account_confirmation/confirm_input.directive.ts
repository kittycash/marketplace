import { Directive, Input, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FocusService } from './focus.service';

@Directive({
 selector: '[confirmInput]',
})

export class ConfirmInputDirective implements OnDestroy{

	message: any;
    subscription: Subscription;

 	private el: any;

 	 // Allow key codes for special events
 	private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'Delete' ];

	constructor(el: ElementRef, private focusService: FocusService) {
	    this.el = el.nativeElement;
	    this.subscription = this.focusService.getFocus().subscribe(response => { 
	    	//Check if the focus is for the current Index
	    	if (response.focusIndex === parseInt(this.confirmInput))
	    	{
	    		this.el.focus();
	    	}
	    });
	}

	ngOnDestroy(){
		// unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
	}

	//The focus index
	@Input() confirmInput: any;

	@HostListener('keydown', ['$event']) onKeyDown(e: any) {
	   
	   	//Allow special events
		if (this.specialKeys.indexOf(e.key) !== -1) {

			if (e.key == "Backspace")
			{
				this.doFocus(-1);
			}

		 return;
		}
	   
	   	//Only allow 0-9 to be input
		if (e.keyCode < 48 || e.keyCode > 57) {
		  e.preventDefault();
		  return;
		}

		//If more than 1 value, replace with the newest
		if (this.el.value && this.el.value.length > 0)
		{
			this.el.value = '';
		}

		this.doFocus(1);
	 }

	 doFocus(direction:number)
	 {
	 	//Timeout before changing focus to prevent refresh issues
		const $this = this;
		setTimeout(() => {
			let focusIndex = parseInt($this.confirmInput);
			let nextFocusIndex = focusIndex + direction;
			$this.focusService.sendFocus(nextFocusIndex);
		});
	 }
	}