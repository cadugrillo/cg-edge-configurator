import { Component, OnDestroy, OnInit } from '@angular/core';
import { CgEdgeSystemService, HostStats } from '../cg-edge-system.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription !: Subscription;
  HostStats: HostStats = new HostStats();

  constructor(private CgEdgeSystemService: CgEdgeSystemService) { }

  ngOnInit(): void {
    this.subscription = timer(0,5000).pipe(
      switchMap(() => this.CgEdgeSystemService.getHostStats())).subscribe((data) => {
        this.getHostStats();
      });     
  }

  getHostStats() {
    this.CgEdgeSystemService.getHostStats().subscribe((data) => {
      this.HostStats = (data as HostStats);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
