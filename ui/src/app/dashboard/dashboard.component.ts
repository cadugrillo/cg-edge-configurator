import { Component, OnDestroy, OnInit } from '@angular/core';
import { CgEdgeSystemService, HostStats } from '../cg-edge-system.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription !: Subscription;
  HostStats: HostStats = new HostStats();
  RamUsedBar!: number
  RamAvailableBar!: number
  RamFreeBar!: number
  DiskAvailable!: number

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
      this.RamUsedBar = (this.HostStats.RamUsed/this.HostStats.RamTotal) * 100;
      this.RamAvailableBar = (this.HostStats.RamAvailable/this.HostStats.RamTotal) * 100;
      this.RamFreeBar = (this.HostStats.RamFree/this.HostStats.RamTotal) * 100;
      this.DiskAvailable = (this.HostStats.DiskAvailable/this.HostStats.DiskTotal) * 100;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
