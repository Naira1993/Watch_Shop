import { Component, OnInit, OnDestroy } from '@angular/core';
import { WatchesService } from '../shared/services/watch.service';
import { Watch } from '../shared/interface';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  searchStr = '';
  watches: Watch[] = [];
  id: number;
  subscription: Subscription
;
  constructor(private watchService: WatchesService,
    private route: ActivatedRoute) { }

   ngOnInit() {
    this.subscription = this.watchService.getAll()
      .subscribe((watches: Watch[]) => {
        this.watches = watches
      })
    this.route.params
      .subscribe((params: Params) => {
        this.id = params.id
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
