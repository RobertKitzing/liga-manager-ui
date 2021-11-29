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

  appsettings: AppsettingsModel;

  constructor(private httpClient: HttpClient) { }

  loadAppsettings(): Promise<any> {
    return firstValueFrom(this.httpClient.get('./appsettings.json').pipe(
      tap(
        (res) => {
          this.appsettings = res
        }
      ),
    ))
    // return new Promise(
    //   (resolve, reject) => {
    //     this.httpClient.get('./appsettings.json')
    //       .toPromise()
    //       .then(
    //         (res) => {
    //           resolve(<AppsettingsModel>res);
    //         }
    //       ).catch(
    //         (error) => {
    //           reject(error);
    //         }
    //       );
    //   }
    // );
  }
}
