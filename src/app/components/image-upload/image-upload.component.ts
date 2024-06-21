import { Component } from '@angular/core';
import { DepthEstimationService } from '../../services/depth-estimation.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  constructor(private depthEstimationService: DepthEstimationService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.depthEstimationService.predictFromFile(file);
    }
  }

  onExampleClick() {
    this.depthEstimationService.predictFromUrl('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/bread_small.png');
  }
}
