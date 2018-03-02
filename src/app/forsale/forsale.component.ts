import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { KittiesService } from '../shared/kitties.service';

@Component({
  selector: 'app-forsale',
  templateUrl: './forsale.component.html',
  styleUrls: ['./forsale.component.scss']
})
export class ForSaleComponent implements OnInit {

  kitties: Array<object>;
  page: number = 1;
  isLoading: boolean;
  key: string = 'kitty_id';
  reverse: boolean = false;

  constructor(private kittiesService: KittiesService) { }

  ngOnInit() {
    this.isLoading = true;

    this.kittiesService.getForSale()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((kitties: Array<object>) => { 
        this.kitties = kitties; 
      });
  }

  showToDo() {
    alert("Still ToDo");
  }

  //set default sorting
  // this.key = 'kitty_id'; 
  // this.reverse = false;

  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
