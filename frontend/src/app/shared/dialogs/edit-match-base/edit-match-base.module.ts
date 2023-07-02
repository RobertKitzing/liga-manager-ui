import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMatchBaseComponent } from './edit-match-base.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDateModule } from '@lima/shared/pipes';

const declarations = [EditMatchBaseComponent];

@NgModule({
    declarations,
    imports: [CommonModule, CustomDateModule, TranslateModule.forChild()],
    exports: declarations,
})
export class EditMatchBaseModule {}
