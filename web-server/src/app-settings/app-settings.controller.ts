import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AppsettingsModel {
    host?: string;
    googleMapsApiKey: string;
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
        }
    }
}
