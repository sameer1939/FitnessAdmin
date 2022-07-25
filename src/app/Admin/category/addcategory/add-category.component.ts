import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryId: number;
  category = new Category();
  constructor(private cateService: CategoryService, private router: Router, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("id")) {
      this.categoryId = +this.route.snapshot.params["id"];
      this.cateService.getCategorybyId(this.categoryId).subscribe((data: any) => {
        this.category.name = data.name;
        this.category.visible = data.visible;
      })
    }

  }

  AddCategory(category: NgForm) {
    if (this.route.snapshot.paramMap.get("id")) {
      this.categoryId = +this.route.snapshot.params["id"];
      this.category.id = this.categoryId;
      this.category.name = category.control.get('name').value;
      this.category.visible = category.control.get('visible').value;
      this.cateService.updateCategory(this.category).subscribe(data => {
        this.alertify.success("Category Updated Successfully");
        category.reset();
        this.router.navigate(['/admin/category']);
      })
    }
    else {
      this.cateService.addCategory(category.value).subscribe(data => {
        this.alertify.success("Category Added Successfully");
        category.reset();
        this.router.navigate(['/admin/category']);
      })
    }

  }
}
