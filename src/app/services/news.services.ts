import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { RespuestaTopHeadlines, Article, ArticlesByCategoryAndPage } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  private executeQuery<T>(endpoint: string)  {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadlines(): Observable<Article[]> {

    return this.getTopHeadlinesByCategory('business');
    //return this.http.get<RespuestaTopHeadlines>(
      //`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
        //params: { apiKey }
      //}
    //).pipe(
      //map( ({articles}) => articles)
    //)
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false ): Observable<Article[]> {
    if ( loadMore ) {
      return this.getArticlesByCategory(category);
    }

    if ( this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?category=${category}`)
      .pipe(
        map( ({articles}) => articles)
      );
    //   console.log('Petición HTTP realizada');  // Línea 22
    // return this.http.get<Article[]>('url...');
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {

    if ( Object.keys ( this.articlesByCategoryAndPage).includes(category) ) {
      // ya tenemos la categoría
     //this.articlesByCategoryAndPage[category].page += 0;
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        map( ({articles}) => {

          if ( articles.length === 0 ) return [];

          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
          }

          return this.articlesByCategoryAndPage[category].articles;
        })
      );
  }
}
