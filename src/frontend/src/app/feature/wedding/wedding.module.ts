import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeddingRoutingModule } from './wedding-routing.module';
import { CreateWeddingComponent } from './create-wedding/create-wedding.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreateWeddingComponent],
  imports: [CommonModule, WeddingRoutingModule, SharedModule],
})
export class WeddingModule {}
