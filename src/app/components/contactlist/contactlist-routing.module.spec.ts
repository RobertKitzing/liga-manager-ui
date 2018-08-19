import { ContactlistRoutingModule } from './contactlist-routing.module';

describe('ContactlistRoutingModule', () => {
  let contactlistRoutingModule: ContactlistRoutingModule;

  beforeEach(() => {
    contactlistRoutingModule = new ContactlistRoutingModule();
  });

  it('should create an instance', () => {
    expect(contactlistRoutingModule).toBeTruthy();
  });
});
