import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.services';
import { Article } from '../../interfaces';
import { IonInfiniteScroll, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from '../../components/articles/articles.component';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonicModule, ArticlesComponent]
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;
  public articles: Article[] = [];


  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadlinesByCategory('sports', false)
      .subscribe( articles => {
        this.articles = [...articles];
      });
  }

  loadData(event:any) {
    console.log(event,'si entre 1');
    this.newsService.getTopHeadlinesByCategory('sports', true)
      .subscribe(articles => {
        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          console.log(event,'si entre 2');
          return;

        }
        this.articles = articles;
        this.infiniteScroll.complete();
      });
  }
}

