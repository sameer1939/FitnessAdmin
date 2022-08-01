import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleList } from 'src/app/model/articleList';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleList:ArticleList[];
  constructor(private router:Router,private articleService:ArticleService) { }

  ngOnInit(): void {
  }

  getAllArticle(){
    this.articleService.getArticles().subscribe((data:ArticleList[])=>{
      this.articleList = data;
    })
  }
  EditArticle(id){
    this.router.navigate(['/admin/addfullarticle/'+id]);
  }
  deleteArticle(id){
    
  }

}
