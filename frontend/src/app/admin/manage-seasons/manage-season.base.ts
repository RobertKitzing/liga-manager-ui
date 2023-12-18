import { inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SeasonState } from "@api/graphql";
import { SeasonService } from "@lima/shared/services";
import { map, switchMap } from "rxjs";

export class ManageSeasonBase {

    SeasonState = SeasonState;

    activatedRoute = inject(ActivatedRoute);

    seasonService = inject(SeasonService);

    season$ = this.activatedRoute.paramMap.pipe(
      map(
        (params) => params.get('seasonId'),
      ),
      switchMap(
        (seasonId) => this.seasonService.getSeasonById$(seasonId!),
      ),
    );

}