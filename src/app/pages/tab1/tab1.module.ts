import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Tab1Page } from './tab1.page';
import { ArticlesComponent } from '../../components/articles/articles.component'; // standalone

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ArticlesComponent, // standalone component importado aquí
    Tab1Page // <-- aquí si es standalone
  ]
  // No uses declarations si es standalone
})
export class Tab1PageModule {}
