import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  async init() {
    try {
      this.appsettings = await this.loadAppsettings();
    } catch (error) {
      console.error(error);
    }
  }

  loadAppsettings(): Promise<AppsettingsModel> {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get('./appsettings.json')
          .toPromise()
          .then(
            (res) => {
              resolve(<AppsettingsModel>res);
            }
          ).catch(
            (error) => {
              reject(error);
            }
          );
      }
    );
  }
}
