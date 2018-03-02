import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { KittiesService } from '../shared/kitties.service';

@Component({
  selector: 'app-den-of-iniquity',
  templateUrl: './den.component.html',
  styleUrls: ['./den.component.scss']
})
export class DenComponent implements OnInit {

  kitties: Array<object>;
  page: number = 1;
  isLoading: boolean;
  key: string = 'kitty_id';
  reverse: boolean = false;

  constructor(private kittiesService: KittiesService) { }

  ngOnInit() {
    this.isLoading = true;

    this.kittiesService.getForSire()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((kitties: Array<object>) => { 
        this.kitties = kitties; 
      });
  }

  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse;
  }
}
