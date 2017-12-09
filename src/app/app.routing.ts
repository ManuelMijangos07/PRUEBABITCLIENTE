import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//Home
import { HomeComponent} from './components/home.component';
//import user_register
import {UserEditComponent} from './components/user-edit.component';
//import cliente
import {ClientListComponent} from './components/client-list.component';
// crear cliente
import { ClientAddComponent} from './components/client-add.component';
// obtener cliente
import {ClientEditComponent} from './components/client-edit.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clients/:page', component: ClientListComponent},
  {path: 'crear-cliente', component: ClientAddComponent},
  {path: 'editar-cliente/:id', component: ClientEditComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
