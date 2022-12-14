import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AppsettingsModel {
    googleMapsApiKey: string;
    graphqlUrl: string;
    graphqlWsUrl: string;
}


@Controller()
export class AppSettingsController {

    constructor(
        private configService: ConfigService,
    ) {

    }

    @Get('/appsettings.json')
    getAppsettings() {
        return {
            googleMapsApiKey: this.configService.get('GOOGLE_MAPS_API_KEY'),
            graphqlUrl: this.configService.get('GRAPHQL_URL'),
            graphqlWsUrl: this.configService.get('GRAPHQL_WS_URL'),
        }
    }
}
