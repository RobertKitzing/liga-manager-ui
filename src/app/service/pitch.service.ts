import { Client, Pitch } from './../api/openapi';
import { Injectable } from '@angular/core';

@Injectable()
export class PitchService {

    pitches: Pitch[];
    constructor(private apiClient: Client) { }
}
