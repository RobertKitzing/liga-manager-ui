import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs';

export class PruningTranslationLoader implements TranslateLoader {

    private http = inject(HttpClient);

    constructor(private prefix: string, private suffix: string) {}

    getTranslation(lang: string) {
        return this.http
            .get(`${this.prefix}${lang}${this.suffix}`)
            .pipe(
                map((res) => this.process(res)),
            );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private process(object: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newObject: any = {};
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                if (typeof object[key] === 'object') {
                    newObject[key] = this.process(object[key]);
                } else if (typeof object[key] === 'string' && object[key] === '') {
                // do not copy empty strings
                } else {
                    newObject[key] = object[key];
                }
            }
        }
        return newObject;
    }

}
