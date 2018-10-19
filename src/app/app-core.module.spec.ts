import { AppCoreModule } from './app-core.module';

describe('AppCoreModule', () => {
  let appCoreModule: AppCoreModule;

  beforeEach(() => {
    appCoreModule = new AppCoreModule();
  });

  it('should create an instance', () => {
    expect(appCoreModule).toBeTruthy();
  });
});
