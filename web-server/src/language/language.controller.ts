import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import * as languagesJS from 'languages';
import { Cache } from 'cache-manager';

export interface AvailableLanguages {
    code: string,
    direction: string,
    name: string,
    nativeName: string
}

const AvailableLanguagesCacheKey = 'languages';

@Controller()
export class LanguageController {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {

    }

    @Get('languages')
    async getLanguages(): Promise<AvailableLanguages[]> {
        
        let languages = await this.cacheManager.get<AvailableLanguages[]>(AvailableLanguagesCacheKey);
        if (!languages) {
            const path = join(__dirname, '..', '..', 'client', 'i18n');
            languages = fs.readdirSync(path).map(x => {
                const code = x.split('.')[0];
                const info = languagesJS.getLanguageInfo(code);
                return {
                    code,
                    ...info
                }
            });
            await this.cacheManager.set(AvailableLanguagesCacheKey, languages, 0);
        }
        return Promise.resolve(languages);
    }
}
