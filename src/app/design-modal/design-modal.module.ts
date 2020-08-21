import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModalPage } from './design-modal.page';
import {AXButtonModule} from '@acorex/components';

@NgModule({
  declarations: [DesignModalPage],
  imports: [ CommonModule, AXButtonModule ],
  exports: [DesignModalPage],
  providers: [],
})
export class DesignPageModule {}
