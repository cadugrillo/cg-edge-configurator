import { Component, OnInit } from '@angular/core';
import { CgEdgeContainersService, ContainersRepo } from '../cg-edge-containers.service';

@Component({
  selector: 'app-app-repository',
  templateUrl: './app-repository.component.html',
  styleUrls: ['./app-repository.component.css']
})
export class AppRepositoryComponent implements OnInit {

  containersRepo!: ContainersRepo

  constructor(private CgEdgeContainerService: CgEdgeContainersService) { }

  ngOnInit(): void {
    this.getContainersRepo();
  }

  getContainersRepo() {
    this.CgEdgeContainerService.getContainersRepo().subscribe((data) => {
      this.containersRepo = (data as ContainersRepo);
    });
  }
}
