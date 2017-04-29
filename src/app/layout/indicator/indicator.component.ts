import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';
import { Node } from '../node';
import { Indicator } from '../indicator';
import { IndicatorService } from '../indicator.service';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {
  nodes: Node[];
  title = "Configure Indicators";
  colors = {}

  constructor(private cpService: ColorPickerService,
    private nodeService: NodeService,
    private indicatorService: IndicatorService) { }

  ngOnInit() {
    this.getNodes();
  }

  getNodes(): void {
    this.nodeService.getNodes().then((nodes) => {
      this.nodes = nodes;
      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].modules.length; j++) {
          if (nodes[i].modules[j].type == "indicator") {
            this.colors[i] = 'rgb(' + nodes[i].modules[j].color + ')';
          }
        }
      }
    })
  }

  updateColors(n: number): void {
    var t = this.colors[n].substring(4).split(',')
    var c = [parseInt(t[0]), parseInt(t[1]), parseInt(t[2].substring(0, t[2].length-1))];
    this.nodes[n].modules.forEach((module) => {
      if (module.type == 'indicator') {
        console.log(t);
        console.log(c);
        module.color[0] = c[0];
        module.color[1] = c[1];
        module.color[2] = c[2];
        this.indicatorService.setColor(c, this.nodes[n]._id)
          .then((p) => {
            this.nodeService.update(this.nodes[n])
              .then(n => console.log(n))
          });
      }
    })
  }

}
