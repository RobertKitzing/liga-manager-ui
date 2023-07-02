import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeasonState, UserRole } from 'src/api/graphql';

type Enums = SeasonState | UserRole;

@Pipe({
    name: 'enumTranslate',
})
export class EnumTranslatePipe implements PipeTransform {

    constructor(private translatePipe: TranslatePipe) {}

    transform(value: Enums): unknown {
        return this.translatePipe.transform(this.interpretValue(value));
    }

    interpretValue(value: Enums): string {
        switch (value) {
            case SeasonState.Ended:
                return marker('SeasonState.Ended');
            case SeasonState.Preparation:
                return marker('SeasonState.Preparation');
            case SeasonState.Progress:
                return marker('SeasonState.Progress');
            case UserRole.Admin:
                return marker('UserRole.Admin');
            case UserRole.TeamManager:
                return marker('UserRole.TeamManager');
            default:
                throw new Error(`Unupported Enum Value ${value}`);
        }
    }

}
