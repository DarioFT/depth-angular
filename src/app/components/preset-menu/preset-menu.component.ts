import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DepthEstimationService } from '../../services/depth-estimation.service';

@Component({
  selector: 'app-preset-menu',
  standalone: true,
  templateUrl: './preset-menu.component.html',
  styleUrls: ['./preset-menu.component.css'],
  imports: [MatButtonModule]
})
export class PresetMenuComponent {
  constructor(private depthEstimationService: DepthEstimationService) {}

  startMovement(preset: string) {
    this.depthEstimationService.startCameraMovement(preset);
  }
}
