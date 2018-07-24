import { Injectable } from '@angular/core';
import { Client, Pitch } from '../../api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PitchService {

  pitches: Pitch[];

  pitchAdded: Subject<void> = new Subject<void>();

  constructor(private apiClient: Client) {
    this.pitchAdded.subscribe(
      () => {
        this.load();
      }
    );
  }

  getPitchById(id: string): Pitch {
    const pitch: Pitch = this.pitches.find(t => t.id === id);
    return pitch;
  }

  public async load() {
    this.pitches = await this.loadPitches();
  }

  async loadPitches(): Promise<Pitch[]> {
    return new Promise<Pitch[]>(
      (resolve) => {
        this.apiClient.getAllPitches().subscribe(
          (pitches) => {
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
