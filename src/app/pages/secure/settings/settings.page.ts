import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthService, public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  // Sign out
  signOut() {
    this.authService.signOut();
  }

}
