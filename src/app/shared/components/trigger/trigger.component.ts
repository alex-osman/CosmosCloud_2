import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { ColorPickerService } from 'angular2-color-picker';
import { Relay } from './../../services/relay';
import { Channel } from './../../services/channel';
import { Node } from './../../services/node';
import { NodeService } from '../../services/node/node.service';


@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent implements OnInit {
  @Output() onGetTrigger = new EventEmitter();


  nodes: Node[];
  action: string;
  module: any;
  node: Node;
  value: string;
  actions: Object;
  

  constructor(private nodeService: NodeService, private cpService: ColorPickerService) { }

  ngOnInit() {
    this.getNodes();
    this.actions = {
      'relay': ['on', 'off', 'toggle'],
      'indicator': ['on', 'off']
    }
  }

  getNodes(): void {
    this.nodeService.getNodes()
    .then(nodes => this.nodes = nodes);
  }

  getTrigger() {
    let ret = "http://localhost:4200/"
    let triggerString = "";

    console.log(this.node);
    console.log(this.module);
    console.log(this.action);
    console.log(this.value);

    if (this.module.type == 'relay') {
      ret += 'relay/' + this.node.ip + '/' + this.action;
      triggerString = "Turn " + this.node.name + " " + this.action
      if (!Number.isNaN(parseInt(this.value))) {
        ret += '/' + this.value;
        triggerString = "Turn " + this.node.name + " " + this.module.channels[parseInt(this.value)].name + " " + this.action;
      }
    } else if (this.module.type == 'indicator') {
      let colors = this.value.substring(4).split(',').map(x => parseInt(x));

      ret += 'rgb/' + this.node._id + '/' + this.action;
      ret += '/' + colors[0] + '/' + colors[1] + '/' + colors[2];
      triggerString = "Turn " + this.node.name + " rgb " + this.action + " to " + colors
    } else {
      console.log("Not sure what you're trying to save here...");
    }
    this.onGetTrigger.emit({
      url: ret,
      triggerString
    });
    console.log("Emitted: " + ret);
  }

}
