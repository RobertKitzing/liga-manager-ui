import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { SeasonManagerComponent } from '@app/admin/seasonmanager/seasonmanager.component';
import { SeasonManagerModule } from '@app/admin/seasonmanager/seasonmanager.module';

describe('SeasonManagerComponent', () => {
  let component: SeasonManagerComponent;
  let fixture: ComponentFixture<SeasonManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          SeasonManagerModule
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
