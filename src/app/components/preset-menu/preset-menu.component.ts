import { Component } from '@angular/core';
import { DepthEstimationService } from '../../services/depth-estimation.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DomSanitizer } from '@angular/platform-browser';
import { customIcons } from '../../models/custom-icons';

@Component({
  selector: 'app-preset-menu',
  standalone: true,
  templateUrl: './preset-menu.component.html',
  styleUrls: ['./preset-menu.component.css'],
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
  ],
})
export class PresetMenuComponent {
  motionAmount: number = 40;
  focusPoint: number = 50;
  edgeDilation: number = 0;

  displacementScale: number = 0.75;
  animationLength: number = 4;

  recording = false;

  constructor(
    private depthEstimationService: DepthEstimationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    customIcons.forEach(icon => {
      iconRegistry.addSvgIcon(
        icon.svg,
        sanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }

  toggleGIFRecording() {
    if (this.recording) {
      this.depthEstimationService.stopGIFRecording();
    } else {
      this.depthEstimationService.startGIFRecording();
    }
    this.recording = !this.recording;
  }

  startMovement(preset: string) {
    this.depthEstimationService.startCameraMovement(preset);
  }

  onDisplacementScaleChange(value: number) {
    this.depthEstimationService.onDisplacementScaleChange(value);
  }

  onMotionAmountChange(value: number) {
    this.depthEstimationService.setMotionAmount(value);
  }

  onAnimationLengthChange(value: number) {
    this.depthEstimationService.onAnimationLengthChange(value);
  }

  onFocusPointChange(value: number) {
    this.depthEstimationService.setFocusPoint(value);
  }

  onEdgeDilationChange(value: number) {
    this.depthEstimationService.setEdgeDilation(value);
  }
}
