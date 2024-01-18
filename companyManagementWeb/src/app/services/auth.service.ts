import { Injectable, signal } from '@angular/core';
import { user } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  // undefined - initial state , null - not logged in, user - login
  userSignal = signal<user | undefined | null>(undefined);
  updateSignal = signal<boolean>(false);
  constructor() {}
}
