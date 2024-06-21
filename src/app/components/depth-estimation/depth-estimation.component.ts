import { Component, OnInit } from '@angular/core';
import { DepthEstimationService } from '../../services/depth-estimation.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-depth-estimation',
  standalone: true,
  templateUrl: './depth-estimation.component.html',
  styleUrls: ['./depth-estimation.component.css'],
  imports: [MatSliderModule]
})
export class DepthEstimationComponent implements OnInit {
  status: string;

  constructor(private depthEstimationService: DepthEstimationService) {
    this.status = '';
  }

  ngOnInit(): void {
    this.depthEstimationService.status$.subscribe(status => {
      this.status = status;
    });
  }
}
