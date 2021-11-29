import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { EditRankingPenaltyComponent } from './edit-ranking-penalty.component';

describe('EditRankingPenaltyComponent', () => {
  let component: EditRankingPenaltyComponent;
  let fixture: ComponentFixture<EditRankingPenaltyComponent>;

  beforeEach(waitForAsync(() => {
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
