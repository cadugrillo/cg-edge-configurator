import { Component, OnInit } from '@angular/core';
import { CgEdgeConfigService, MccConfig } from '../cg-edge-config.service';

@Component({
  selector: 'app-mqtt-cloud-connector',
  templateUrl: './mqtt-cloud-connector.component.html',
  styleUrls: ['./mqtt-cloud-connector.component.css']
})
export class MqttCloudConnectorComponent implements OnInit {

  appName!: string;
  newTopic!: string;
  mccConfig: MccConfig = new MccConfig();

  constructor(private CgEdgeConfigService: CgEdgeConfigService) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.appName = "mqtt-cloud-connector"
    this.CgEdgeConfigService.getConfig(this.appName).subscribe((data) => {
      this.mccConfig = (data as MccConfig)
      console.log(this.mccConfig)
    });
  }

  setConfig() {
    this.CgEdgeConfigService.setMccConfig(this.appName,this.mccConfig).subscribe((data) => {
      console.log(data)
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

}
