import { Component, OnInit } from '@angular/core';
import { CgEdgeUsersService } from '../cg-edge-users.service'

@Component({
  selector: 'menu1-item1-side1',
  templateUrl: './menu1-item1-side1.component.html',
  styleUrls: ['./menu1-item1-side1.component.css']
})
export class Menu1Item1Side1Component implements OnInit {


  constructor(private CgEdgeUsersService: CgEdgeUsersService) { }

  ngOnInit(): void {
    
  }

  isAuthenticated() {
    return this.CgEdgeUsersService.isAuthenticated()
  }

}
