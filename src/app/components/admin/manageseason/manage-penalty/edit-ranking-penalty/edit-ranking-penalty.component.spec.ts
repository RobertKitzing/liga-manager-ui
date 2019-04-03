import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRankingPenaltyComponent } from './edit-ranking-penalty.component';

describe('EditRankingPenaltyComponent', () => {
  let component: EditRankingPenaltyComponent;
  let fixture: ComponentFixture<EditRankingPenaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRankingPenaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRankingPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
