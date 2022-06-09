import { Component, OnInit } from '@angular/core';
import { CgEdgeConfigService, MccConfig } from '../cg-edge-config.service';
import { AppSettingsService } from '../app-settings.service';
import {MatDialog} from '@angular/material/dialog';
import { MessagePopupComponent} from '../message-popup/message-popup.component';

@Component({
  selector: 'app-mqtt-cloud-connector',
  templateUrl: './mqtt-cloud-connector.component.html',
  styleUrls: ['./mqtt-cloud-connector.component.css']
})
export class MqttCloudConnectorComponent implements OnInit {

  appName!: string;
  newTopic!: string;
  mccConfig: MccConfig = new MccConfig();

  constructor(private CgEdgeConfigService: CgEdgeConfigService,
              private AppSettingsService: AppSettingsService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.appName = "mqtt-cloud-connector"
    this.CgEdgeConfigService.getConfig(this.appName).subscribe((data) => {
      this.mccConfig = (data as MccConfig);
    });
  }

  setConfig() {
    this.CgEdgeConfigService.setMccConfig(this.mccConfig).subscribe((data) => {
      this.dialog.open(MessagePopupComponent, {data: {text: data}});
      this.getConfig()
    });
    
  }

  addSubTopic() {
    this.newTopic = "newtopic/sample"
    this.mccConfig.TopicsSub.Topic.push(this.newTopic)
  }

  deleteSubTopic() {
    this.mccConfig.TopicsSub.Topic.splice(-1)
  }

  addPubTopic() {
    this.newTopic = "newtopic/sample"
    this.mccConfig.TopicsPub.Topic.push(this.newTopic)
  }

  deletePubTopic() {
    this.mccConfig.TopicsPub.Topic.splice(-1)
  }

  trackByFn(index: any, item: any) {
    return index;
 }

 onFilesAdded() {
  this.AppSettingsService.getJSON().subscribe((data) => {
    console.log(data)
  });
 }

}
