import { Component, OnInit } from '@angular/core';
import { Relay } from '../relay';
import { Channel } from '../channel';
import { Node } from '../node';
import { NodeService } from '../node.service';

@Component({
  moduleId: module.id,
  selector: 'my-rssi',
  templateUrl: './rssi.component.html',
  styleUrls: ['./rssi.component.css']
})

export class RSSIComponent implements OnInit {
  nodes: Node[];
  channels: Channel[];

  constructor(private nodeService: NodeService) { }

    ngOnInit() {
    this.getNodes();
  }

    getNodes(): void {
      this.nodeService.getNodes().then(nodes => this.nodes = nodes);
  }

  onChange(value) {
    this.nodes = value;
  }


}