import { inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SeasonState } from "@api/graphql";
import { APP_ROUTES } from "@lima/app.routes.enum";
import { SeasonService } from "@lima/shared/services";
import { map, switchMap, tap } from "rxjs";
import { ADMIN_ROUTES } from "../admin.routes.enum";

export class ManageSeasonBase {

    SeasonState = SeasonState;

    activatedRoute = inject(ActivatedRoute);

    seasonService = inject(SeasonService);

    router = inject(Router);
  
    season$ = this.activatedRoute.paramMap.pipe(
      map(
        (params) => params.get('seasonId'),
      ),
      switchMap(
        (seasonId) => this.seasonService.getSeasonById$(seasonId!),
      ),
      tap(
        (season) => {
          this.seasonService.manageSeason = season;
          if(!season) {
            this.router.navigateByUrl(`${APP_ROUTES.ADMIN}/${ADMIN_ROUTES.SEASONS}`)
          }
        },
      ),
    );

}