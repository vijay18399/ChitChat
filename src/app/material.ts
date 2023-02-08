import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    ClipboardModule,
    MatTabsModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    ClipboardModule,
    MatTabsModule
  ]
})
export class MaterialModule { }