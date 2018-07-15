import { TableRoutingModule } from './table-routing.module';

describe('TableRoutingModule', () => {
  let tableRoutingModule: TableRoutingModule;

  beforeEach(() => {
    tableRoutingModule = new TableRoutingModule();
  });

  it('should create an instance', () => {
    expect(tableRoutingModule).toBeTruthy();
  });
});
