import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/Article';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  visibleCategory: any[];
  visibleSubCategory: any[];
  article = new Article();
  fileUpload: File = null;
  mainId: number;
  ImageUrl = environment.ImageUrl;
  constructor(private articleService: ArticleService, private alertify: AlertifyService, private router: Router,
    private categoryService: CategoryService,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.textarea').summernote();
    });
    this.bindVisibleCategory();
    if (this.route.snapshot.paramMap.get("id")) {
      this.mainId = +this.route.snapshot.params["id"];
      this.articleService.getArticlebyId(this.mainId).subscribe((data: any) => {
        this.bindSubCategory(data.categoryId);
        this.article.categoryId = data.categoryId;
        this.article.subCategoryId = data.subCategoryId;
        this.article.visible = data.visible;
        this.article.heading = data.heading;
        $('#txtShortArticle').summernote('code',data.shortArticle);
        this.imgURL = this.ImageUrl+data.image;
        $('#txtArticleInEnglish').summernote('code', data.articleInEnglish);
        $('#txtArticleInHindi').summernote('code',data.articleInHindi);
        this.article.id = data.id;

      })
    }
  }

  bindVisibleCategory() {
    this.categoryService.bindVisibleCategory().subscribe((data: any[]) => {
      this.visibleCategory = data;
    })
  }


  handleFileUpload(file: FileList) {
    if(file.length===0){
      return;
    }
    var mimeType = file[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
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

    if (this.route.snapshot.paramMap.get("id")) {
      if(this.fileUpload==null){
        articleData.append("Image", this.fileUpload);
      }
      else{
        articleData.append("Image", this.fileUpload, this.fileUpload.name);
      }
      this.mainId = +this.route.snapshot.params["id"];
      articleData.append("id", this.mainId.toString());
      this.articleService.updateArticle(articleData).subscribe(() => {
        this.alertify.success("Article Updated Successfully");
        this.router.navigate(['/admin/article']);
      })
    }else{
      articleData.append("Image", this.fileUpload, this.fileUpload.name);
      this.articleService.addArticle(articleData).subscribe(() => {
        this.alertify.success("Article Added Successfully");
        this.router.navigate(['/admin/article']);
      })
    }



  }

  bindSubCategory(id){
    this.categoryService.getSubCatByCategoryId(id).subscribe((data:any[])=>{
      this.visibleSubCategory = data;
    })
  }

}
