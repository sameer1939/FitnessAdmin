import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ArticleList } from "src/app/model/articleList";
import { AlertifyService } from "src/app/services/alertify.service";
import { ArticleService } from "src/app/services/article.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  articleList: ArticleList[];
  ImageUrl = environment.ImageUrl;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private alertity: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle() {
    this.articleService.getArticles().subscribe((data: ArticleList[]) => {
      this.articleList = data;
    });
  }
  EditArticle(id) {
    this.router.navigate(["/admin/addshortarticle/" + id]);
  }
  deleteArticle(id) {
    this.alertity.confirm(
      "Warning",
      "Are you sure you want to delete this article",
      () => {
        this.articleService.deleteArticle(id).subscribe(() => {
          this.getAllArticle();
          this.alertity.success("Article deleted successfully");
        });
      },
      () => {
        console.log("cancel deleted");
      }
    );
  }
}
