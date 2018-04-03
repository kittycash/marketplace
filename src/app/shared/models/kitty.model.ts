export class Kitty {

  constructor() { 
  	this.image = '/assets/catholder.png';
    this.reservation_data = {step: 'confirm_email'};
  }

  kitty_id: number;
  breed: string;
  image: string;
  generation: number;
  name: string;
  description: string;
  price_btc: number;
  price_sky: number;
  is_open: boolean;
  details: any;
  reservation_data: any;
}