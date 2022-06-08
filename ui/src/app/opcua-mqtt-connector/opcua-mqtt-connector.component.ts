import { Component, OnInit } from '@angular/core';
import { CgEdgeConfigService, OpcuaConfig, Node } from '../cg-edge-config.service';


@Component({
  selector: 'app-opcua-mqtt-connector',
  templateUrl: './opcua-mqtt-connector.component.html',
  styleUrls: ['./opcua-mqtt-connector.component.css']
})
export class OpcuaMqttConnectorComponent implements OnInit {

  appName!: string;
  newTopic!: string;
  newNode: Node = new Node();
  opcuaConfig: OpcuaConfig = new OpcuaConfig();

  constructor(private CgEdgeConfigService: CgEdgeConfigService) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.appName = "opcua-mqtt-connector"
    this.CgEdgeConfigService.getConfig(this.appName).subscribe((data) => {
      this.opcuaConfig = (data as OpcuaConfig)
      console.log(this.opcuaConfig)
    });
  }

  setConfig() {
    this.CgEdgeConfigService.setOpcuaConfig(this.opcuaConfig).subscribe((data) => {
      console.log(data)
      this.getConfig()
    });
    
  }

  addNode() {
    this.newNode.Name = ""
    this.newNode.NodeID = ""
    this.opcuaConfig.NodesToRead.Nodes.push(this.newNode)
  }

  deleteNode() {
    this.opcuaConfig.NodesToRead.Nodes.splice(-1)
  }

  addPubTopic() {
    this.newTopic = "newtopic/sample"
    this.opcuaConfig.TopicsPub.Topic.push(this.newTopic)
  }

  deletePubTopic() {
    this.opcuaConfig.TopicsPub.Topic.splice(-1)
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}
