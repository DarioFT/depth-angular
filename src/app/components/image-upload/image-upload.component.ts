import { Component, ElementRef, ViewChild } from '@angular/core';
import { DepthEstimationService } from '../../services/depth-estimation.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @ViewChild('uploadContainer', { static: true }) container!: ElementRef;

  constructor(private depthEstimationService: DepthEstimationService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const img = new Image();
          img.onload = () => {
            this.depthEstimationService.updateImageDimensions({ width: img.width, height: img.height });
            this.container.nativeElement.style.backgroundImage = `url(${img.src})`;
          };
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
      this.depthEstimationService.predictFromFile(file);
    }
  }

  onExampleClick() {
    const exampleUrl = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/bread_small.png';
    const img = new Image();
    img.onload = () => {
      this.depthEstimationService.updateImageDimensions({ width: img.width, height: img.height });
      this.container.nativeElement.style.backgroundImage = `url(${img.src})`;
    };
    img.src = exampleUrl;
    this.depthEstimationService.predictFromUrl(exampleUrl);
  }
}
