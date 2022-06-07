import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CgEdgeConfigService } from './cg-edge-config.service';
import { MqttCloudConnectorComponent } from './mqtt-cloud-connector/mqtt-cloud-connector.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MqttCloudConnectorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [CgEdgeConfigService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
