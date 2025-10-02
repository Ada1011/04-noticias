import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

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

  constructor() { }

  openArticle() {
    window.open(this.article.url, '_blank');
  }

}
