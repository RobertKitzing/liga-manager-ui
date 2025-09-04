import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeasonState, TournamentState, UserRole } from '@liga-manager-api/graphql';

type Enums = SeasonState | UserRole | TournamentState;

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
            case TournamentState.Ended:
                return marker('SeasonState.Ended');
            case SeasonState.Preparation:
            case TournamentState.Preparation:
                return marker('SeasonState.Preparation');
            case SeasonState.Progress:
            case TournamentState.Progress:
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
