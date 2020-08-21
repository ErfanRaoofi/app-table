import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalGalleryModule } from './modal-gallary/modal-gallary.module';
import { DesignPageModule } from './design-modal/design-modal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ModalGalleryModule,DesignPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
