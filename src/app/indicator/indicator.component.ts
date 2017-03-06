import { Component, OnInit } from '@angular/core';
import { Indicator } from '../indicator';
import { IndicatorService } from '../indicator.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {
  indicators: Indicator[];
  title = "Configure Indicators";

  constructor(private indicatorService: IndicatorService) { }

  ngOnInit() {
    this.getIndicators();
  }

  getIndicators(): void {
    this.indicatorService.getIndicators().then(indicators => this.indicators = indicators);
  }

}
