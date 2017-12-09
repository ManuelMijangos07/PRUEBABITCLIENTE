import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent} from './components/home.component';
import { UserEditComponent} from './components/user-edit.component';
import { ClientListComponent} from './components/client-list.component';
import { ClientAddComponent} from './components/client-add.component';
import {ClientEditComponent} from './components/client-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ClientListComponent,
    HomeComponent,
    ClientAddComponent,
    ClientEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
