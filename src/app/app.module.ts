import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './Admin/category/category.component';
import { AddCategoryComponent } from './Admin/category/addcategory/add-category.component';
import { HeaderComponent } from './Layout/header/header.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { MainComponent } from './main/main.component';
import { CategoryService } from './services/category.service';
import { AlertifyService } from './services/alertify.service';
import { ArticleService } from './services/article.service';
import { ErrorHandlingInterceptor } from './shared/Errorhandling.interceptor';
import { SubcategoryComponent } from './Admin/category/subcategory/subcategory.component';
import { AddsubcategoryComponent } from './Admin/category/subcategory/addsubcategory/addsubcategory.component';
import { ArticleComponent } from './Admin/article/article.component';
import { AddArticleComponent } from './Admin/article/add-article/add-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    AddCategoryComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
    SubcategoryComponent,
    AddsubcategoryComponent,
    ArticleComponent,
    AddArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, CategoryService,AlertifyService,ArticleService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorHandlingInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
