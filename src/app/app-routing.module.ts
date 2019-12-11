import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchesComponent } from './watches/watches.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './watches/update/update.component';
import { WatchComponent } from './watches/watch/watch.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AboutComponent } from './watches/about/about.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'watches', component: WatchesComponent, children: [
    {path: '', component: WatchComponent},
    {path: ':id', component: UpdateComponent},
    {path: 'watch/:id', component: AboutComponent}
  ]},
  {path: 'add', component: AddWatchComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
