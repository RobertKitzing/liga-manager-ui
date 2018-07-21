import { Injectable } from '@angular/core';
import { Client, Pitch } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  pitches: Pitch[];

  constructor(private apiClient: Client) {
  }

  getPitchById(id: string): Pitch {
    const pitch: Pitch = this.pitches.find(t => t.id === id);
    return pitch;
  }

  async loadPitches(): Promise<Pitch[]> {
    return new Promise<Pitch[]>(
      (resolve) => {
        this.apiClient.getAllPitches().subscribe(
          (pitches) => {
            this.pitches = pitches;
            resolve(pitches);
          },
          (error) => {
            resolve(null);
          },
          () => {
          }
        );
      }
    );
  }
}
