import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  categoryId: number;
  category = new Category();
  fileUpload: File = null;
  ImageUrl = environment.ImageUrl;
  constructor(private cateService: CategoryService, private router: Router, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("id")) {
      this.categoryId = +this.route.snapshot.params["id"];
      this.cateService.getCategorybyId(this.categoryId).subscribe((data: any) => {
        this.category.name = data.name;
        this.category.visible = data.visible;
        this.category.quotes = data.quotes;
        this.imgURL = this.ImageUrl+data.categoryImage;
      })
    }

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

  AddCategory(category: NgForm) {
    var categoryData = new FormData();

    categoryData.append("name", category.control.get('name').value);
    categoryData.append("visible", category.control.get('visible').value);
    categoryData.append("quotes", category.control.get('quotes').value);


    if (this.route.snapshot.paramMap.get("id")) {
      this.categoryId = +this.route.snapshot.params["id"];
      if(this.fileUpload==null){
        categoryData.append("categoryImage", this.fileUpload);
      }
      else{
        categoryData.append("categoryImage", this.fileUpload, this.fileUpload.name);
      }
      categoryData.append("id", this.categoryId.toString());
      this.cateService.updateCategory(categoryData).subscribe(data => {
        this.alertify.success("Category Updated Successfully");
        category.reset();
        this.router.navigate(['/admin/category']);
      })
    }
    else {
      categoryData.append("categoryImage", this.fileUpload, this.fileUpload.name);
      this.cateService.addCategory(categoryData).subscribe(data => {
        this.alertify.success("Category Added Successfully");
        category.reset();
        this.router.navigate(['/admin/category']);
      })
    }

  }
}
