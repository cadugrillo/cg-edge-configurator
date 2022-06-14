import { Component, OnInit } from '@angular/core';
import { CgEdgeContainersService, ContainersRepo, Template } from '../cg-edge-containers.service';
import {MatDialog} from '@angular/material/dialog';
import { MessagePopupComponent} from '../message-popup/message-popup.component';

@Component({
  selector: 'app-app-repository',
  templateUrl: './app-repository.component.html',
  styleUrls: ['./app-repository.component.css']
})
export class AppRepositoryComponent implements OnInit {

  containersRepo!: ContainersRepo

  constructor(private CgEdgeContainerService: CgEdgeContainersService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContainersRepo();
  }

  getContainersRepo() {
    this.CgEdgeContainerService.getContainersRepo().subscribe((data) => {
      this.containersRepo = (data as ContainersRepo);
    });
  }

  installContainer(AppTemplate: Template) {
    this.CgEdgeContainerService.installContainer(AppTemplate).subscribe((data) => {
      this.dialog.open(MessagePopupComponent, {data: {title: "App Installation", text: data}});
    });
  }
}
