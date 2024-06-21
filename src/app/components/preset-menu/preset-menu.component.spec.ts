import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetMenuComponent } from './preset-menu.component';

describe('PresetMenuComponent', () => {
  let component: PresetMenuComponent;
  let fixture: ComponentFixture<PresetMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresetMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
