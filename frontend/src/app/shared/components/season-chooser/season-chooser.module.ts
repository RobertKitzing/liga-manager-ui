import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonChooserComponent } from './season-chooser.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { EnumTranslateModule } from '@lima/shared/pipes';

const declarations = [SeasonChooserComponent];

@NgModule({
    declarations,
    imports: [
        CommonModule,
        MatSelectModule,
        TranslateModule.forChild(),
        EnumTranslateModule,
    ],
    exports: declarations,
})
export class SeasonChooserModule {}