import { Component, OnInit } from '@angular/core';
import { WeddingService } from 'src/app/shared/client';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {

  pictures: string[] = null;
  BASE_URL = environment.API_BASE_URL;

  constructor(private weddingService: WeddingService, private authService: AuthService) { }

  ngOnInit() {
    this.weddingService.weddingIdPicturesGet(this.authService.currentUserValue.weddingId).subscribe(result => {
      this.pictures = result;
    });
  }

}
