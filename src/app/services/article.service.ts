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
    return this.http.get(this.baseUrl + "article/bindarticle");
  }

  addArticle(article: FormData) {
    return this.http.post(this.baseUrl + "article/add", article);
  }

  deleteArticle(id) {
    return this.http.delete(this.baseUrl + "article/deletearticle/"+id);
  }
  // get single article by id
  getArticlebyId(id){
    return this.http.get(this.baseUrl+"article/articleById/"+id);
  }
  // update article details
  updateArticle(article: FormData) {
    return this.http.put(this.baseUrl + "article/update", article);
  }
}
