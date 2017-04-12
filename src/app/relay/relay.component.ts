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

  constructor(private nodeService: NodeService,
    private relayService: RelayService) { }

  ngOnInit() {
    this.getNodes();
  }

  getNodes(): void {
    this.nodeService.getNodes().then(nodes => this.nodes = nodes);
  }

  toggle(node: Node, channelI: number): void {
    this.relayService.toggle(node, channelI)
      .then((status) => {
        for (var i = 0; i < node.modules.length; i++) {
          if (node.modules[i].type == "relay")
            node.modules[i].channels[channelI].isOn = status;
        }
        console.log(status);
        this.update(node);
      })
      .catch(something => console.log(something));
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
      this.update(node);
    })
    .catch(something => console.log(something));
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
      this.update(node);
    })
    .catch(something => console.log(something));
  }

  update(node: Node): void {
    this.nodeService.update(node).then(n => node = n);
  }

  all(node: Node, allOn: boolean): void {
    for (var i = 0; i < node.modules.length; i++) {
      if (node.modules[i].type == "relay") {
        node.modules[i].channels.forEach((channel, index) => {
          if(channel.isOn != allOn) {
            console.log(channel)
            this.on(node);
          } else {
            console.log("Turning " + channel)
            this.off(node);
          }
        })
      }
    }
  }
}




