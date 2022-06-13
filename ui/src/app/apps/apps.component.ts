import { Component, OnInit } from '@angular/core';
import { CgEdgeContainersService, Container } from '../cg-edge-containers.service';
import {MatDialog} from '@angular/material/dialog';
import { MessagePopupComponent} from '../message-popup/message-popup.component';
import { Stream } from 'stream';
import { ConsoleLogger } from '@aws-amplify/core';

@Component({
  selector: 'app-home',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  containers!: Container[]

  constructor(private CgEdgeContainerService: CgEdgeContainersService,
                      public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContainers();
  }

  getContainers() {
    this.CgEdgeContainerService.getContainers().subscribe((data) => {
      this.containers = (data as Container[]);
    });
  }

  startContainer(Id: string) {
    this.CgEdgeContainerService.startContainer(Id).subscribe((data) =>{
      this.dialog.open(MessagePopupComponent, {data: {title: "Start App", text: data}});
      this.getContainers();
    });
  }

  stopContainer(Id: string) {
    this.CgEdgeContainerService.stopContainer(Id).subscribe((data) =>{
      this.dialog.open(MessagePopupComponent, {data: {title: "Stop App", text: data}});
      this.getContainers();
    });
  }

  restartContainer(Id: string) {
    this.CgEdgeContainerService.restartContainer(Id).subscribe((data) =>{
      this.dialog.open(MessagePopupComponent, {data: {title: "Restart App", text: data}});
      this.getContainers();
    });
  }

  removeContainer(Id: string) {
    this.CgEdgeContainerService.removeContainer(Id).subscribe((data) =>{
      this.dialog.open(MessagePopupComponent, {data: {title: "Remove App", text: data}});
      this.getContainers();
    });
  }

  GetContainerLogs(Id: string) {
    this.CgEdgeContainerService.getContainersLogs(Id).subscribe((data) =>{
      this.dialog.open(MessagePopupComponent, {data: {title: "App Logs", text: data as string}});
      //console.log(data)
    });
  }

}
