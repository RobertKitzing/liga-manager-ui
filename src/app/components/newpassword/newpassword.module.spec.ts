import { NewpasswordModule } from './newpassword.module';

describe('NewpasswordModule', () => {
  let newpasswordModule: NewpasswordModule;

  beforeEach(() => {
    newpasswordModule = new NewpasswordModule();
  });

  it('should create an instance', () => {
    expect(newpasswordModule).toBeTruthy();
  });
});
