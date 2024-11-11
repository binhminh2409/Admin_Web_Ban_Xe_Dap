import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TypeComponent } from './components/type/type.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { InputStockComponent } from './components/input-stock/input-stock.component';
import { RestockHistoryComponent } from './components/restock-history/restock-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PackagesComponent } from './components/packages/packages.component';
import { NgxPaginationModule } from 'ngx-pagination';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return 'your_token_here';
    },
    allowedDomains: ['example.com'],
    disallowedRoutes: ['example.com/auth/login']
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    TypeComponent,
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent,
    ReportsComponent,
    StockListComponent,
    InputStockComponent,
    RestockHistoryComponent,
    DashboardComponent,
    PackagesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
