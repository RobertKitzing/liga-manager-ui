import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContacsRoutingModule } from './contacs-routing.module';
import { ContacsComponent } from './contacs.component';

@NgModule({
    imports: [CommonModule, ContacsRoutingModule, ContacsComponent],
})
export class ContacsModule {}
