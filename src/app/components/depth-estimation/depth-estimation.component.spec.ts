import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthEstimationComponent } from './depth-estimation.component';

describe('DepthEstimationComponent', () => {
  let component: DepthEstimationComponent;
  let fixture: ComponentFixture<DepthEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepthEstimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepthEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
