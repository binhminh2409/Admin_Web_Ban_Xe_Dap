import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/auth-guard/auth-guard.component'; 
import { TypeComponent } from './components/type/type.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AccessoryListComponent } from './components/accessory-list/accessory-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'type', component: TypeComponent},
  { path: 'product', component: ProductComponent},
  { path: 'product_list', component: ProductListComponent},
  { path: 'accessory_list', component: AccessoryListComponent },
  { path: 'product_Detail',component: ProductDetailComponent},
  { path: 'reports/payment',component: ReportsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export { routes }; // Xuất biến routes
