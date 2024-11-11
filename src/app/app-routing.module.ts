import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'type', component: TypeComponent},
  { path: 'product', component: ProductComponent},
  { path: 'product_list', component: ProductListComponent},
  { path: 'product_Detail',component: ProductDetailComponent},
  { path: 'reports/payment',component: ReportsComponent},
  { path: 'stock',component: StockListComponent},
  { path: 'stock/restock',component: InputStockComponent},
  { path: 'stock/history',component: RestockHistoryComponent},
  { path: 'packages',component: PackagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export { routes }; // Xuất biến routes
