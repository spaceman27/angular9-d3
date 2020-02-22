import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InMemoryWebApiService } from '@secureworks-homeassignment/shared/core';
import { environment } from '../../environments/environment';

export function loadEnvironmentFactory(environmentService: EnvironmentService) {
  return () => environmentService.load();
}
export interface RunTimeEnvironment {
   production: boolean
}
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private environment: RunTimeEnvironment;
  constructor(
    private http: HttpClient,
    private inMemoryWebApiService: InMemoryWebApiService
  ) {}

  getEnvironment() {
    return this.environment;
  }

  load() {
    if (this.isProduction()) {
      return;
    }
    return new Promise<boolean>((resolve, reject) => {
        const data = this.inMemoryWebApiService.createDb();
        resolve(true);
        console.log("app startup:", data);
      })
      .then();
  }

  private isProduction(): boolean {
    return environment.production;
  }
}
