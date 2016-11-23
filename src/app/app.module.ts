import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { PhotoFind } from './app.component';

// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// providers
import { SimpleHttp, AuthService } from '../shared/services/include'

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    PhotoFind,
    // Pages
    AboutPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(PhotoFind)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PhotoFind,
    // Pages
    AboutPage,
    HomePage,
    TabsPage
  ],
  providers: [SimpleHttp,
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }]
})
export class AppModule { }
