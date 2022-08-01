import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(this.baseUrl + "article/getAll");
  }

  addArticle(article: FormData) {
    return this.http.post(this.baseUrl + "article/add", article);
  }

}
