

import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
// import {SocialSharing} from '@ionic-native/social-sharing/ngx'
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { NewsService } from './services/news.services';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [AppComponent],
  //entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    // InAppBrowser,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // InAppBrowser,
    // SocialSharing,// --> este lanza el error de que no carga
    // NewsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
