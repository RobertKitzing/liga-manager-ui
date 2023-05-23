import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

export class AppsettingsModel {
    @ApiProperty()
    host?: string;
    
    @ApiProperty()
    googleMapsApiKey: string;
}

@Controller()
@ApiTags('app-settings')
export class AppSettingsController {

    constructor(
        private configService: ConfigService,
    ) {

    }

    @Get('/appsettings.json')
    @ApiOkResponse({ type: AppsettingsModel })
    @ApiOperation({ operationId: 'getAppsettings' })
    getAppsettings() {
        return {
            googleMapsApiKey: this.configService.get('GOOGLE_MAPS_API_KEY'),
        } as AppsettingsModel
    }
}
