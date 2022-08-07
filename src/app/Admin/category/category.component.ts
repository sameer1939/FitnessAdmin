import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/services/alertify.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categoryList: any[];
  constructor(
    private categoryService: CategoryService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bindCategory();
  }

  bindCategory() {
    this.categoryService.bindCategory().subscribe((data: any[]) => {
      this.categoryList = data;
    });
  }

  deleteCategory(id) {
    this.alertify.confirm(
      "Warning",
      "Are you sure you want to delete this category",
      () => {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.alertify.error("Category Deleted Successfully");
          this.bindCategory();
        });
      },
      () => {
        console.log("cancel deleted");
      }
    );
  }

  EditCategory(id) {
    this.router.navigate(["/admin/addcategory/" + id]);
  }
}
