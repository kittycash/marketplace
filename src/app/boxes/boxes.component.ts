import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { KittiesService } from '../shared/kitties.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements OnInit {

  boxes: Array<object>;
  page: number = 1;
  isLoading: boolean;

  constructor(private kittiesService: KittiesService) { }

  ngOnInit() {
    this.isLoading = true;
    this.kittiesService.getBoxes()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((boxes: Array<object>) => { 
        this.boxes = boxes; 
      });
  }

  showToDo() {
    alert("Still ToDo");
  }
}
