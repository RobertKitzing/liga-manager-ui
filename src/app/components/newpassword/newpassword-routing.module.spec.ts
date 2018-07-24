import { NewpasswordRoutingModule } from './newpassword-routing.module';

describe('NewpasswordRoutingModule', () => {
  let newpasswordRoutingModule: NewpasswordRoutingModule;

  beforeEach(() => {
    newpasswordRoutingModule = new NewpasswordRoutingModule();
  });

  it('should create an instance', () => {
    expect(newpasswordRoutingModule).toBeTruthy();
  });
});
