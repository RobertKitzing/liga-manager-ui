import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Share } from '@capacitor/share';
import { AppSettingsSelectors } from '@liga-manager-ui/states';
import { APP_ROUTES } from '@liga-manager-ui/common';

@Injectable({
    providedIn: 'root',
})
export class ShareService {

    private store = inject(Store);

    private share(url: string) {
        return Share.share({
            url: `${this.store.selectSnapshot(AppSettingsSelectors.host)}/${url}`,
        });
    }

    shareCalendar(teamIds: string) {
        const url = `${APP_ROUTES.CALENDAR}?team_ids=${teamIds}`;
        return this.share(url);
    }

    shareMatch(matchid: string) {
        const url = `${APP_ROUTES.MATCH}?matchid=${matchid}`;
        return this.share(url);
    }

    shareContact(teamid: string) {
        const url = `${APP_ROUTES.TEAM}?teamid=${teamid}`;
        return this.share(url);
    }

}
