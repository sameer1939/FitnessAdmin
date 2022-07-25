import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/model/subcategory';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {

  visibleCategory: any[];
  mainId: number;
  subCategory = new SubCategory();

  constructor(private categoryService: CategoryService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bindVisibleCategory();
    if (this.route.snapshot.paramMap.get("id")) {
      this.mainId = +this.route.snapshot.params["id"];
      this.categoryService.getSubCategorybyId(this.mainId).subscribe((data: any) => {
        this.subCategory.categoryId = data.categoryId;
        this.subCategory.subCategoryName = data.subCategoryName;
        this.subCategory.visible = data.visible;
      })
    }

  }

  bindVisibleCategory() {
    this.categoryService.bindVisibleCategory().subscribe((data: any[]) => {
      this.visibleCategory = data;
    })
  }


  AddSubCategory(subCategory: NgForm) {
    this.subCategory.categoryId = +subCategory.control.get('categoryId').value;
    this.subCategory.subCategoryName = subCategory.control.get('subCategoryName').value;
    this.subCategory.visible = subCategory.control.get('visible').value;

    if (this.route.snapshot.paramMap.get("id")) {
      // Update Sub Category
      this.subCategory.id = +this.route.snapshot.params["id"];
      this.categoryService.updateSubCategory(this.subCategory).subscribe(data => {
        this.alertify.success("Sub Category Updated Successfully");
        this.router.navigate(['/admin/subcategory']);
      })
    }
    else {
      // Add Sub Category
      this.categoryService.addSubCategory(this.subCategory).subscribe(data => {
        this.alertify.success("Sub Category Added Successfully");
        this.router.navigate(['/admin/subcategory']);
      })
    }

  }
}
