import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from 'src/app/components/article/article.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone:true,
  imports:[IonicModule,ComponentsModule,CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

})
export class Tab3Page{

  get articles(): Article[] {
    return this.storageService.LocalArticles;
  }

  constructor( private storageService: StorageService) {}

}
