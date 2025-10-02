import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab1Page } from './tab1.page';
import { ArticlesComponent } from '../../components/articles/articles.component'; // standalone
import { FormsModule } from '@angular/forms';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';


@NgModule({
  imports: [
   CommonModule,
    IonicModule,
     // standalone component importado aquí
    Tab1Page, // <-- aquí si es standalone
    Tab1PageRoutingModule,
    FormsModule,
    ExploreContainerComponentModule
  ]
  // No uses declarations si es standalone
})
export class Tab1PageModule {}
