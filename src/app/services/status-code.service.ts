import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StatusCodeService {
  setStatus(code: number) {
    (global as any).ngStatusCode = code;
  }
}
