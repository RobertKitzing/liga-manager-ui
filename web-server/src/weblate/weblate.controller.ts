import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, map } from 'rxjs';
import { Cache } from 'cache-manager';

const ISO6391 = require('iso-639-1')

export interface AvailableLanguages {
    code: string,
    direction: string,
    name: string,
    nativeName: string
}

const AvailableLanguagesCacheKey = 'languages';

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
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {

    }

    @Post('/clear-cache')
    clearCache() {
        return this.cacheManager.reset();
    }

    @Get('/languages')
    async getLanguages() {
        let languages = await this.cacheManager.get<AvailableLanguages[]>(AvailableLanguagesCacheKey);
        if (!languages) {
            languages = [];
            const langCodes = (await firstValueFrom(this.httpService.get(`${this.weblateBaseUrl}/projects/${this.weblateProject}/languages/`))).data.map(x => x.code);

            for (let code of langCodes) {
                const response = await firstValueFrom(this.httpService.get(`${this.weblateBaseUrl}/languages/${code}/`));
                languages.push({
                    code,
                    direction: response.data.direction,
                    name: response.data.name,
                    nativeName: ISO6391.getNativeName(code),
                })
            }
            await this.cacheManager.set(AvailableLanguagesCacheKey, languages, 0);
        }
        return languages;
    }

    @Get('/language/:code')
    async getLanguage(
        @Param('code') code: string
    ) {
        let data = await this.cacheManager.get(code);
        if (!data) {
            data = await firstValueFrom(this.httpService.get(`${this.weblateBaseUrl}/translations/${this.weblateProject}/${this.weblateComponent}/${code}/file/?format=json`).pipe(map((response) => response.data)));
            await this.cacheManager.set(code, data, 0);
        }
        return data;
    }
}
