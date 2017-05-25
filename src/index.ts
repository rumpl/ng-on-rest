import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';

export interface INgOnRestModuleConfiguration {
  endpoint: string;
}

export const NG_ON_REST_ENDPOINT = new OpaqueToken('ng-on-rest-endpoint');

@NgModule({})
export class NgOnRestModule {
  public static forRoot(config: INgOnRestModuleConfiguration): ModuleWithProviders {
    return {
      ngModule: NgOnRestModule,
      providers: [
        {
          provide: NG_ON_REST_ENDPOINT,
          useValue: config.endpoint,
        },
      ],
    };
  }
}
