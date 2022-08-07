import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  subCategoryList:any[];
  constructor(private categoryService:CategoryService, private router:Router,
    private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.bindSubCategory();
  }

  bindSubCategory(){
    this.categoryService.bindSubCategory().subscribe((data:any[])=>{
      this.subCategoryList = data;
    })
  }
  editSubCategory(id){
    this.router.navigate(['/admin/addsubcategory/'+id]);
  }

  deleteSubCategory(id){
    this.alertify.confirm("Warning","Are you sure you want to delete this category",()=>{
      this.categoryService.deleteSubCategory(id).subscribe(()=>{
        this.alertify.error("Category Deleted Successfully");
        this.bindSubCategory();
      })
    },()=>{
      console.log('cancel delete');
    })
  }
}
