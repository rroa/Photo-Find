import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  photosTab: any = HomePage;
  aboutTab: any = AboutPage;

  constructor() {

  }
}
