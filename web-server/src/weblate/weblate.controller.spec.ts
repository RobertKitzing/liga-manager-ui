import { Test, TestingModule } from '@nestjs/testing';
import { WeblateController } from './weblate.controller';

describe('WeblateController', () => {
  let controller: WeblateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeblateController],
    }).compile();

    controller = module.get<WeblateController>(WeblateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
