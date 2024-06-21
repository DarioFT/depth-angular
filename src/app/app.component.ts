import { Component } from '@angular/core';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { DepthEstimationComponent } from './components/depth-estimation/depth-estimation.component';
import { PresetMenuComponent } from './components/preset-menu/preset-menu.component';
import { DepthEstimationService } from './services/depth-estimation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    ImageUploadComponent,
    DepthEstimationComponent,
    PresetMenuComponent
  ]
})
export class AppComponent {
  isProcessing$ = this.depthEstimationService.isProcessing$;

  constructor(private depthEstimationService: DepthEstimationService) {}
}
