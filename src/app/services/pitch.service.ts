import { Injectable } from '@angular/core';
import { Client, Pitch } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  pitches: Pitch[];

  constructor(private apiClient: Client) {
    this.loadPitches();
  }

  getPitchById(id: string): Pitch {
    const pitch: Pitch = new Pitch(); // this.pitches.find(t => t.id === id);
    pitch.label = "test";
    return pitch;
  }

  async loadPitches(): Promise<Pitch[]> {
    if (!this.pitches) {
      return new Promise<Pitch[]>(
        (resolve) => {
          this.apiClient.getAllTeams().subscribe(
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
    } else {
      return this.pitches;
    }
  }
}
