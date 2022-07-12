import { Component, OnInit } from '@angular/core';
import { CgEdgeContainersService, Template } from '../cg-edge-containers.service';
import {MatDialog} from '@angular/material/dialog';
import { MessagePopupComponent} from '../message-popup/message-popup.component';
import { WaitPopupComponent } from '../wait-popup/wait-popup.component';

@Component({
  selector: 'app-app-launcher',
  templateUrl: './app-launcher.component.html',
  styleUrls: ['./app-launcher.component.css']
})
export class AppLauncherComponent implements OnInit {

  appTemplate: Template = new Template();
  newPort!: string
  newEnv!: string
  newVolume!: string

  Sources: string[] = ['no', 'on-failure', 'always', 'unless-stopped'];

  constructor(private CgEdgeContainerService: CgEdgeContainersService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appTemplate.ports = [];
    this.appTemplate.env = [];
    this.appTemplate.volumes = [];
  }

  trackByFn(index: any, item: any) {
    return index;
 }

  installContainer() {
    this.dialog.open(WaitPopupComponent, {});
    this.CgEdgeContainerService.installContainer(this.appTemplate).subscribe((data) => {
      this.dialog.closeAll();
      this.dialog.open(MessagePopupComponent, {data: {title: "App Installation", text: data}});
    });
  }

  addPort() {
    this.newPort = "";
    this.appTemplate.ports.push(this.newPort);
  }

  deletePort() {
    this.appTemplate.ports.splice(-1);
  }

  addEnv() {
    this.newEnv = "";
    this.appTemplate.env.push(this.newEnv);
  }

  deleteEnv() {
    this.appTemplate.env.splice(-1);
  }

  addVolume() {
    this.newVolume = "";
    this.appTemplate.volumes.push(this.newVolume);
  }

  deleteVolume() {
    this.appTemplate.volumes.splice(-1);
  }
}
