import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from '../article/article.component'; // si es standalone

@Component({
  selector: 'app-articles',
  standalone: true,
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [CommonModule, IonicModule, ArticleComponent] // <-- ¡IMPORTANTE!
})
export class ArticlesComponent {
  @Input() articles: any[] = [];
}
