import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './Admin/article/add-article/add-article.component';
import { ArticleComponent } from './Admin/article/article.component';
import { AddCategoryComponent } from './Admin/category/addcategory/add-category.component';
import { CategoryComponent } from './Admin/category/category.component';
import { AddsubcategoryComponent } from './Admin/category/subcategory/addsubcategory/addsubcategory.component';
import { SubcategoryComponent } from './Admin/category/subcategory/subcategory.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin', component: MainComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'addcategory', component: AddCategoryComponent },
      { path: 'addcategory/:id', component: AddCategoryComponent },
      { path: 'subcategory', component: SubcategoryComponent },
      { path: 'addsubcategory', component: AddsubcategoryComponent },
      { path: 'addsubcategory/:id', component: AddsubcategoryComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'addshortarticle', component: AddArticleComponent },
      { path: 'addshortarticle/:id', component: AddArticleComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
