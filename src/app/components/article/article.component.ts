import { StorageService } from 'src/app/services/storage-service';

import { Component, Input } from '@angular/core';
// import {  } from '@ionic/core';
import { ActionSheetButton, ActionSheetController, IonicModule, Platform } from '@ionic/angular';

import { Article } from '../../interfaces';
import { CommonModule } from '@angular/common';

import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() index!: number;

  constructor(
    // private iab: InAppBrowser, -->deprecated not used ion-native so
    private plat:Platform,
    private actionsheet:ActionSheetController,
    private storage:Storage,
    // private social:SocialSharing,
    private StorageService: StorageService
  ) { }

  async openArticle() {
    if (this.plat.is('hybrid') || this.plat.is('ios') || this.plat.is('android')){
      await Browser.open({url: this.article.url});
      return;
    }

    window.open(this.article.url, '_blank');
  }

    async onOpenMenu(){

      // const articleInFavorite = this.StorageService.articleInFavorites(this.article);

      const shareBtn: ActionSheetButton = {
              text:'Compartir',
              icon:'share-outline',
              handler: () => this.onShareArticle()
            };
      const normalBts: ActionSheetButton[] = [
        {
          text:'Favoritos',
          icon:'heart-outline',
          handler: () => this.onToggle()
        },
        {
          text:'Cancelar',
          icon:'close-outline',
          role:'cancel',
          cssClass:'secondary'
        }
      ];

      if (this.plat.is('capacitor')) {
        //  actionsheetctrl.buttons.unshift(share);
        normalBts.unshift(shareBtn);
      }

      const actionsheetctrl = this.actionsheet.create({
              header:'Opciones',
              buttons: normalBts
      });


      (await actionsheetctrl).present();
    }

    async onShareArticle(){
      // console.log('share article');
      try {
        if (this.plat.is('hybrid')) {

          await Share.share({
            title: this.article.title,
            text: this.article.source.name,
            url: this.article.url
          });
          return;
        }
      } catch (error) {
        console.warn('Capacitor Share error:', error);
      }
      if (navigator.share) {
        await navigator.share({
          title: this.article.title,
          text: `${this.article.source.name}: ${this.article.description || ''}`,
          url: this.article.url
        });
      } else {
        // Simple fallback
        navigator.clipboard.writeText(this.article.url).then(() => {
          alert('URL copiada: ' + this.article.title);
        }).catch(() => {
          prompt('Copia esta URL:', this.article.url);
        });
      }
    }

    onToggle(){
      // console.log('Toggle favoritos:', this.article.title);
      // console.log('toggle article');
      this.StorageService.saveRemoveArticle(this.article);
    }


}

