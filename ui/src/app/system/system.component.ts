import { Component, OnInit } from '@angular/core';
import { CgEdgeContainersService, Container } from '../cg-edge-containers.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  constructor(private CgEdgeContainerService: CgEdgeContainersService) { }

  ngOnInit(): void {
    this.getDockerServerInfo()
  }

  getDockerServerInfo() {
    this.CgEdgeContainerService.getDockerServerInfo().subscribe((data) => {
      console.log(data)
    });
  }
}
