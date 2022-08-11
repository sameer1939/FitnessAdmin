import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category'
import { SubCategory } from '../model/subcategory'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  addCategory(category: FormData) {
    return this.http.post(this.baseUrl + "category/add", category)
  }

  updateCategory(category: FormData) {
    return this.http.put(this.baseUrl + "category/update", category)
  }

  bindCategory(){
    return this.http.get(this.baseUrl+"category/bindcategory");
  }

  bindVisibleCategory(){
    return this.http.get(this.baseUrl+"category/bindVisibleCategory");
  }

  deleteCategory(id){
    return this.http.delete(this.baseUrl+"category/deletecategory/"+id);
  }

  getCategorybyId(id){
    return this.http.get(this.baseUrl+"category/categoryById/"+id);
  }

  //--- Sub Category
  // Add Sub Category api
  addSubCategory(subCategory:SubCategory){
    return this.http.post(this.baseUrl+"subcategory/add",subCategory);
  }

  // Bind all sub category api
  bindSubCategory(){
    return this.http.get(this.baseUrl+"subcategory/bindSubCategory");
  }

  // get single sub category detail
  getSubCategorybyId(id){
    return this.http.get(this.baseUrl+"subcategory/subCategoryById/"+id);
  }

  // update sub category
  updateSubCategory(subCategory: SubCategory) {
    return this.http.put(this.baseUrl + "subcategory/update", subCategory)
  }

  // delete sub category
  deleteSubCategory(id){
    return this.http.delete(this.baseUrl+"subcategory/deletesubcategory/"+id);
  }
  // get by category
  getSubCatByCategoryId(id){
    return this.http.get(this.baseUrl+"subcategory/getbyCategoryId/"+id);
  }
}
