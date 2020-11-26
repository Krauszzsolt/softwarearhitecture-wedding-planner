import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { NewWeddingDto, WeddingDto, WeddingService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class WeddingManagementService {
  constructor(private weddingService: WeddingService, ) {}

  add(newWeddingDto: NewWeddingDto): Observable<WeddingDto> {
    return this.weddingService.weddingAddPost(newWeddingDto).pipe(

    );
  }
}
