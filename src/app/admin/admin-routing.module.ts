import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookCreateComponent } from './book-create/book-create.component';

const routes: Routes = [
    {
        path: 'admin',
        redirectTo: 'admin/create'
    },
    {
        path: 'admin/create',
        component: BookCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
