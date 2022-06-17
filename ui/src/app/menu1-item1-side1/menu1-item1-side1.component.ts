import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu1-item1-side1',
  templateUrl: './menu1-item1-side1.component.html',
  styleUrls: ['./menu1-item1-side1.component.css']
})
export class Menu1Item1Side1Component implements OnInit {

  typesOfOption: string[] = ['Dashboard', 'Apps', 'App-Repository', 'Users','Settings', 'System'];

  constructor() { }

  ngOnInit(): void {
  }

}
