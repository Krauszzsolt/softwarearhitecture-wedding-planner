import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeddingRoutingModule } from './wedding-routing.module';
import { CreateWeddingComponent } from './create-wedding/create-wedding.component';

@NgModule({
  declarations: [CreateWeddingComponent],
  imports: [CommonModule, WeddingRoutingModule],
})
export class WeddingModule {}
