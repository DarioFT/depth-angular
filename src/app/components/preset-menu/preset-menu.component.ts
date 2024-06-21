import { Component } from '@angular/core';
import { DepthEstimationService } from '../../services/depth-estimation.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-preset-menu',
  standalone: true,
  templateUrl: './preset-menu.component.html',
  styleUrls: ['./preset-menu.component.css'],
  imports: [MatExpansionModule, MatButtonModule]
})
export class PresetMenuComponent {
  constructor(private depthEstimationService: DepthEstimationService) {}

  startMovement(preset: string) {
    this.depthEstimationService.startCameraMovement(preset);
  }
}
