import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { KittiesService } from '../shared/kitties.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  kitties: Array<object>;
  page: number = 1;
  isLoading: boolean;

  constructor(private kittiesService: KittiesService) { }

  ngOnInit() {
    this.isLoading = true;
    this.kittiesService.getExplore()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((kitties: Array<object>) => { 
        this.kitties = kitties; 
      });
  }
}
