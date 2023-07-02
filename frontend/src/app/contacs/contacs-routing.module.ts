import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContacsComponent } from './contacs.component';

const routes: Routes = [
    {
        path: '',
        component: ContacsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContacsRoutingModule {}
