import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withComponentInputBinding: 경로 파라미터(:id 등)를 같은 이름의 컴포넌트 input()에 자동으로 넣어 줌
    provideRouter(routes, withComponentInputBinding())
  ]
};
