export class Kitty {

  constructor() { 
  	this.image = '/assets/catholder.png';
    this.reservation_data = {step: 'confirm_email'};
    this.box_image_url = '/assets/fake_cdn/box-1.png';
  }
  kitty_id: number;
  box_image_url: string;
  breed: string;
  image: string;
  generation: number;
  name: string;
  description: string;
  price_btc: number;
  price_sky: number;
  is_open: boolean;
  details: any;
  legendary: boolean;
  box_open: boolean;
  reservation: string;
  reservation_data: any;
}