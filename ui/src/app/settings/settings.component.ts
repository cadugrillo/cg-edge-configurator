import { Component, OnInit } from '@angular/core';
import { CgEdgeSystemService, InterfaceSet } from '../cg-edge-system.service';
import {MatDialog} from '@angular/material/dialog';
import { MessagePopupComponent} from '../message-popup/message-popup.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  InterfaceSet: InterfaceSet = new InterfaceSet();

  constructor(private CgEdgeSystemService: CgEdgeSystemService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getHostNetwork();
  }

  getHostNetwork() {
    this.CgEdgeSystemService.getHostNetwork().subscribe((data) => {
      this.InterfaceSet = (data as InterfaceSet);
      console.log(this.InterfaceSet)
    });
  }

  setHostNetwork() {
    console.log(this.InterfaceSet)
    this.CgEdgeSystemService.setHostNetwork(this.InterfaceSet).subscribe((data) => {
      this.dialog.open(MessagePopupComponent, {data: {title: "Write Configuration", text: data}});
      this.getHostNetwork();
    });
  }
}
