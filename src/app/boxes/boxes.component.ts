import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { KittiesService } from '../shared/kitties.service';
import { Paging } from '../shared/paging';

import { Entries } from '../shared/models/kitty_api/entries.model';

import { Kitty } from '../shared/models/kitty.model';
import { FilterOptions } from '../shared/models/filter_options.model';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

  currentKitty: any;
  boxes: Array<Kitty>;
  page: number = 1;
  per_page: number = 8;
  count: number = 0;
  isLoading: boolean;

  filter: FilterOptions = {
    sort_key: 'name',
    sort_direction: '-',
    coin_type: '',
    coin_min: 0,
    coin_max: 0
  }
  
  constructor(private kittiesService: KittiesService,
              private paging: Paging) { 

  }

  ngOnInit() {
    this.kittiesService.currentKitty.subscribe(kitty => this.currentKitty = kitty);
    this.loadBoxes();
  }

  getPage(page: number) {
        this.page = page;
        this.loadBoxes();
    }

  loadBoxes(){
    this.isLoading = true;

    let order = "";

    let btc_filter = "";
    let sky_filter = "";


    if (this.filter && this.filter.coin_type == "btc" && this.filter.coin_min && this.filter.coin_max)
    {
      btc_filter = this.filter.coin_min + "," + this.filter.coin_max;
      this.filter.sort_key = "price_btc";
    }
    else if (this.filter && this.filter.coin_type == "sky" && this.filter.coin_min && this.filter.coin_max)
    {
      btc_filter = this.filter.coin_min + "," + this.filter.coin_max;
      this.filter.sort_key = "price_sky";
    }

    order = this.filter.sort_direction + this.filter.sort_key;

    let requestOpts = {
      btc_filter: btc_filter,
      sky_filter: sky_filter,
      order: order,
      page: this.paging.format(this.page, this.per_page, this.count)
    };

    this.kittiesService.getBoxes(requestOpts)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: Entries) => { 
        this.count = res.total_count;
        this.boxes = [];
        //Assign responce objects to Kitty Class
        res.entries.map(kitty =>{
          this.boxes.push(Object.assign(new Kitty(), kitty));
        });
      });
  }
  showToDo() {
    alert("Still ToDo");
  }
}
