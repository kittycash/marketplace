import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { KittiesService } from '../shared/kitties.service';

@Component({
  selector: 'app-mykitties',
  templateUrl: './mykitties.component.html',
  styleUrls: ['./mykitties.component.scss']
})
export class MyKittiesComponent implements OnInit {

  kitties: Array<object>;
  page: number = 1;
  isLoading: boolean;

  constructor(private authenticationService: AuthenticationService, private kittiesService: KittiesService) { }

  ngOnInit() {
    const user_id = this.authenticationService.credentials.user_id
    this.isLoading = true;

    this.kittiesService.getMyKitties({ user_id: user_id })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((kitties: Array<object>) => { 
        this.kitties = kitties; 
      });
  }

  showToDo() {
    alert("Still ToDo");
  }
}
