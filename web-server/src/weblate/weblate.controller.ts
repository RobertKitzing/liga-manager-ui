import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
const ISO6391 = require('iso-639-1')

@Controller('weblate')
export class WeblateController {

    weblateHost = this.configService.get('WEBLATE_HOST');
    weblatePort = this.configService.get('WEBLATE_PORT');
    weblateProject = this.configService.get('WEBLATE_PROJECT');
    weblateComponent = this.configService.get('WEBLATE_COMPONENT');

    weblateBaseUrl = `http://${this.weblateHost}:${this.weblatePort}/api`;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {

    }

    @Get('/languages')
    async getLanguages() {
        const langCodes = (await firstValueFrom(this.httpService.get(`${this.weblateBaseUrl}/projects/${this.weblateProject}/languages/`))).data.map(x => x.code);
        
        const languages = [];
    
        for (let code of langCodes) {
            const response = await firstValueFrom(this.httpService.get(`${this.weblateBaseUrl}/languages/${code}/`));
            const statistics = await firstValueFrom(this.httpService.get(`${this.weblateBaseUrl}/languages/${code}/statistics`));
            console.log(statistics);
            languages.push({
                code,
                direction: response.data.direction,
                name: response.data.name,
                nativeName: ISO6391.getNativeName(code)
            })
        }

        return languages;
    }

    @Get('/language/:code')
    getLanguage(
        @Param('code') code: string
    ) {
        return this.httpService.get(`${this.weblateBaseUrl}/translations/${this.weblateProject}/${this.weblateComponent}/${code}/file/?format=json`).pipe(map((response) => response.data));
    }
}
