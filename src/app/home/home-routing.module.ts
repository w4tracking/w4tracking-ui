import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: '../documents/documents.module#DocumentsModule',
      },
      {
        path: '_documents',
        loadChildren: '../documents/documents.module#DocumentsModule',
      },
      {
        path: '_companies',
        loadChildren: '../companies/companies.module#CompaniesModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
