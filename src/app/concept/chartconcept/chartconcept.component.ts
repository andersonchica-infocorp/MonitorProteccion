import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chartconcept',
  templateUrl: './chartconcept.component.html',
  styleUrls: ['./chartconcept.component.scss']
})
export class ChartconceptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


view: any[] = [700, 400];

// options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  data = [{
  	name: "hola",
  	value: 4567
  },{
  	name: "puto",
  	value: 676
  },{
  	name:"juan",
  	value: 980
  }]
}
