import { ContactlistModule } from './contactlist.module';

describe('ContactlistModule', () => {
  let contactlistModule: ContactlistModule;

  beforeEach(() => {
    contactlistModule = new ContactlistModule();
  });

  it('should create an instance', () => {
    expect(contactlistModule).toBeTruthy();
  });
});
