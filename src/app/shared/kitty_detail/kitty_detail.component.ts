import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { KittiesService } from '../kitties.service';
import { Kitty } from '../models/kitty.model';
import { environment } from '../../../environments/environment';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'kitty-detail',
  templateUrl: './kitty_detail.component.html',
  styleUrls: ['./kitty_detail.component.scss']
})
export class KittyDetailComponent implements OnInit {

  constructor(private router: Router,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService, 
              private kittiesService: KittiesService,
              private dialogRef:MatDialogRef<KittyDetailComponent>) { }

  isLoading: boolean;
  currentKitty: any = false;
  kittyHistory: any = [];

  ngOnInit() {
    this.kittiesService.currentKitty.subscribe(kitty => {
      this.kittyHistory = [kitty];

      this.showLatestKitty();
    });
  }

  private showLatestKitty()
  {
    this.currentKitty = this.kittyHistory[this.kittyHistory.length - 1];

    this.currentKitty.traits = this.kittiesService.lookup(this.currentKitty.phenotypes);

    console.log(this.currentKitty);
  }

  popHistory() {
    this.kittyHistory.pop();
    this.showLatestKitty();
  }
  getKitty(kitty_id:number) {
    this.kittiesService.getKitty({kitty_id: kitty_id}).subscribe(kitty => {
      this.kittyHistory.push(kitty);
      console.log(kitty);
      this.showLatestKitty();
    });
  }

  doClose() {
     this.dialogRef.close();
  }

  kittyImage(kitty_id:number) {
    return environment.serverUrl + "/v1/image/" + kitty_id;
  }

  traitImage(url:String) {
    return environment.serverUrl + url;
  }

  
}

