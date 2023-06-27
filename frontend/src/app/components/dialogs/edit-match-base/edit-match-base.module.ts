import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchBaseComponent } from './edit-match-base.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDateModule } from 'src/app/pipes/custom-date/custom-date.module';

const declarations = [EditMatchBaseComponent];

@NgModule({
    declarations,
    imports: [CommonModule, CustomDateModule, TranslateModule.forChild()],
    exports: declarations,
})
export class EditMatchBaseModule {}
