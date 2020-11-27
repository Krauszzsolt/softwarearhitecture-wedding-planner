import { Injectable } from '@angular/core';
import { WeddingService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private weddingService: WeddingService) {}

  public upload(id: number, file: Blob) {
    return this.weddingService.weddingIdUploadPost(id, file);
  }
}
