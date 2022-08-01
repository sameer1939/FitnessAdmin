import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';
declare var $: any;

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article = new Article();
  fileUpload: File = null;
  constructor(private articleService: ArticleService, private alertify: AlertifyService, private router: Router) {

  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.textarea').summernote();
    });
  }

  handleFileUpload(file: FileList) {
    this.fileUpload = file.item(0);
  }

  AddShortArticle(art: NgForm) {

    var articleData = new FormData();

    articleData.append("categoryId", art.control.get("categoryId").value);
    articleData.append("subCategoryId", art.control.get("subCategoryId").value);
    articleData.append("heading", art.control.get("heading").value);
    articleData.append("shortArticle", $('#txtShortArticle').summernote('code'));
    articleData.append("articleInEnglish", $('#txtArticleInEnglish').summernote('code'));
    articleData.append("articleInHindi", $('#txtArticleInHindi').summernote('code'));
    articleData.append("visible", art.control.get("visible").value);
    articleData.append("Image", this.fileUpload, this.fileUpload.name);

    this.articleService.addArticle(articleData).subscribe(() => {
      this.alertify.success("Article Added Successfully");
      this.router.navigate(['/admin/article']);
    })

  }

}
