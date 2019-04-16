import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navOpen: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  actionNav() {
    this.navOpen = !this.navOpen;
  }

}
