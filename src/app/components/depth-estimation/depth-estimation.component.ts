import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('depthEstimationContainer', { static: true }) depthEstimationContainer!: ElementRef;

  constructor(private depthEstimationService: DepthEstimationService) {
    this.status = '';
  }

  ngOnInit(): void {
    this.depthEstimationService.status$.subscribe(status => {
      this.status = status;
    });
    this.depthEstimationService.imageDimensions$.subscribe(dimensions => {
      this.adjustContainerDimensions(dimensions.width, dimensions.height);
    });
  }

  adjustContainerDimensions(width: number, height: number): void {
    const viewportWidth = window.innerWidth * 0.95;
    const viewportHeight = window.innerHeight * 0.95;
    
    let newWidth: number;
    let newHeight: number;
    
    const widthRatio = viewportWidth / width;
    const heightRatio = viewportHeight / height;
    const scaleFactor = Math.min(widthRatio, heightRatio);
    
    newWidth = width * scaleFactor;
    newHeight = height * scaleFactor;
    
    this.depthEstimationContainer.nativeElement.style.width = `${newWidth}px`;
    this.depthEstimationContainer.nativeElement.style.height = `${newHeight}px`;
  }
  
}
