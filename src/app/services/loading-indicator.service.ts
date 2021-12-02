import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  loading = new Subject<boolean>();
  
  constructor() { }
}
