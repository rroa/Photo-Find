import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { PhotoFind } from './app.component';

// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// providers
import { SimpleHttp } from '../shared/services/include'

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
  providers: [SimpleHttp]
})
export class AppModule {}
