import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/providers/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  content_loaded: boolean = false;

  constructor(
    private gs: GlobalService,
    private platform: Platform
  ) {

    this.platform.ready().then(() => {
      this.gs.pegaDadosUser();
      console.log(this.gs.dadosUser);
    });
  }

  ngOnInit() {
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

}
