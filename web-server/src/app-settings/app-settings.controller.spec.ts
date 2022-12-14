import { Test, TestingModule } from '@nestjs/testing';
import { AppSettingsController } from './app-settings.controller';

describe('AppSettingsController', () => {
  let controller: AppSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppSettingsController],
    }).compile();

    controller = module.get<AppSettingsController>(AppSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
