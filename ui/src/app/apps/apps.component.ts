import { Component, OnInit } from '@angular/core';
import { CgEdgeContainersService, Container } from '../cg-edge-containers.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { WaitPopupComponent } from '../wait-popup/wait-popup.component';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-home',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  containers!: Container[]

  constructor(private CgEdgeContainerService: CgEdgeContainersService,
              public dialog: MatDialog, private router: Router) { }

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
    this.dialog.open(WaitPopupComponent, {});
    this.CgEdgeContainerService.getContainersLogs(Id).subscribe((data) =>{
      this.dialog.closeAll();
      return saveAs(new Blob([data as string], { type: 'TXT' }), 'logs.txt');
    });
  }

  OpenConfig(Container: Container) {
    switch (Container.Names[0]) {
      case "/mqtt-cloud-connector":
        this.router.navigate(['/mqtt-cloud-connector']);
        break;
      case "/opcua-mqtt-connector":
        this.router.navigate(['/opcua-mqtt-connector']);
        break;
      default:
        window.open('http://' + window.location.hostname + ':' + Container.Ports[0].PublicPort,'_blank');
        console.log(Container.Names[0]);
        break;
    }
  }

}
