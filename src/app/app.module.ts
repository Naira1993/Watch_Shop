import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainComponent } from './layout/main/main.component';
import { WatchesComponent } from './watches/watches.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './watches/update/update.component';
import { WatchComponent } from './watches/watch/watch.component';
import { AboutComponent } from './watches/about/about.component';
import { CommentsComponent } from './watches/about/comments/comments.component';
import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    WatchesComponent,
    CartComponent,
    OrdersComponent,
    LoginComponent,
    HomePageComponent,
    AddWatchComponent,
    UpdateComponent,
    WatchComponent,
    AboutComponent,
    CommentsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
