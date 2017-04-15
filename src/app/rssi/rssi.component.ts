import { Component, OnInit } from '@angular/core';
import { Relay } from '../relay';
import { Channel } from '../channel';
import { Node } from '../node';
import { NodeService } from '../node.service';
import { RelayService } from '../relay.service';

@Component({
  moduleId: module.id,
  selector: 'my-rssi',
  templateUrl: './rssi.component.html',
  styleUrls: ['./rssi.component.css']
})

export class RSSIComponent implements OnInit {
	nodes: Node[];

	constructor(private nodeService: NodeService) { }

    ngOnInit() {
 		this.getNodes();
 	}

  	getNodes(): void {
    	this.nodeService.getNodes().then(nodes => this.nodes = nodes);
	}


}