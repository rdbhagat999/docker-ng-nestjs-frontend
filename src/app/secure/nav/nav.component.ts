import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() user: User;
  @Output() logoutEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.logoutEvent.emit('handleLogout')
  }

}
