import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface AppsettingsModel {
  host?: string;
  googleMapsApiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {

  appsettings?: AppsettingsModel;

  constructor(private httpClient: HttpClient) { }

  loadAppsettings() {
    return this.httpClient.get<AppsettingsModel>('./appsettings.json').pipe(
      tap(
        (res: AppsettingsModel) => {
          this.appsettings = res
        }
      ),
    )
  }
}