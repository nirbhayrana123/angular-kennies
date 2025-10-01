// status-code.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StatusCodeService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setStatus(code: number) {
    if (isPlatformServer(this.platformId)) {
      (global as any).ngStatusCode = code;
    }
  }
}
