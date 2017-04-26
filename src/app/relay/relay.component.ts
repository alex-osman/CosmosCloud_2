import { Component, OnInit } from '@angular/core';
import { Relay } from '../relay';
import { Channel } from '../channel';
import { Node } from '../node';
import { NodeService } from '../node.service';
import { RelayService } from '../relay.service';

@Component({
  selector: 'my-relay',
  templateUrl: './relay.component.html',
  styleUrls: ['./relay.component.css']
})
export class RelayComponent implements OnInit {
  nodes: Node[];
  edits: any[];

  constructor(private nodeService: NodeService,
    private relayService: RelayService) { }

  ngOnInit() {
    this.edits = [false]
    this.refreshCycle();
  }

  getNodes(): void {
    this.nodeService.getNodes()
    .then((nodes) => {
      this.nodes = nodes;
      this.edits = nodes.map(n => false);
      console.log(this.edits);
    })
  }

  toggle(node: Node, channelI: number): void {
    this.relayService.toggle(node, channelI)
      .then((status) => {
        for (var i = 0; i < node.modules.length; i++) {
          if (node.modules[i].type == "relay")
            node.modules[i].channels[channelI].isOn = status;
        }
        console.log(status);
        this.getNodes();
      })
      .catch(err => console.log(err));
  }

  on(node: Node): void {
    this.relayService.on(node)
    .then((status) => {
      for (var i = 0; i < node.modules.length; i++) {
        if (node.modules[i].type == "relay") {
          node.modules[i].channels[0].isOn = true;
          node.modules[i].channels[1].isOn = true;
        }
      }
      console.log(status);
      this.getNodes();
    })
    .catch(err => console.log(err));
  }

  off(node: Node): void {
  this.relayService.off(node)
    .then((status) => {
      for (var i = 0; i < node.modules.length; i++) {
        if (node.modules[i].type == "relay") {
          node.modules[i].channels[0].isOn = false;
          node.modules[i].channels[1].isOn = false;
        }
      }
      this.getNodes();
    })
    .catch(err => console.log(err));
  }

  update(node: Node): void {
    this.nodeService.update(node).then(n => node = n).then(()=> this.getNodes());
  }

  all(node: Node, allOn: boolean): void {
    node.modules
      .find(module => module.type == 'relay')
      .channels.forEach(channel => {
        if (channel.isOn != allOn)
          this.on(node);
        else this.off(node);
      })
  }

  cancel(node): void {
    this.getNodes();
  }

  save(node): void {
    this.update(node);
  }

  //This will refresh the status of the nodes every second
  refreshCycle(): void {
    if (this.edits.filter(x => x).length < 1) {
      this.getNodes()
    }
    setTimeout(() => this.refreshCycle(), 5000);
  }
}




