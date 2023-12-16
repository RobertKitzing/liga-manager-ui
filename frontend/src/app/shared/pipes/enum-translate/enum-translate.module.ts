import { NgModule } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EnumTranslatePipe } from './enum-translate.pipe';

const declarations = [EnumTranslatePipe];

@NgModule({
    declarations,
    providers: [
        TranslatePipe,
    ],
    exports: declarations,
})
export class EnumTranslateModule {}
