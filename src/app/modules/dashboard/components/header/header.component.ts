import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from 'src/app/helpers/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  value = ''
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  search(value: string) {
    this.searchEvent.emit(value);
  }

  clear() {
    this.value = '';
    this.searchEvent.emit('');
  }

  logout() {
    StorageHelper.userInfo = null;
    this.router.navigate(['auth/login']);
  }


}
