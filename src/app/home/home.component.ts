import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
import { Node } from '../node';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nodes: Node[];
  private cosmosImage = require("./image/cosmos.jpg")

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.getNodes()
  }

  getNodes(): void {
    this.nodeService.getNodes().then((nodes) => this.nodes = nodes);
  }

}
