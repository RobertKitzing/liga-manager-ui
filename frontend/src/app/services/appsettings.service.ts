import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';

export interface AppsettingsModel {
  googleMapsApiKey: string;
  graphqlUrl: string;
  graphqlWsUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {

  appsettings?: AppsettingsModel;

  constructor(private httpClient: HttpClient) { }

  loadAppsettings(): Promise<any> {
    return firstValueFrom(this.httpClient.get<AppsettingsModel>('./appsettings.json').pipe(
      tap(
        (res: AppsettingsModel) => {
          this.appsettings = res
        }
      ),
    ))
  }
}
