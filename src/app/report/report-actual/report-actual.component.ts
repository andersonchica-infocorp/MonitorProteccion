import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-actual',
  templateUrl: './report-actual.component.html',
  styleUrls: ['./report-actual.component.scss']
})
export class ReportActualComponent implements OnInit {

  single: any[];

  view: any[] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#A10A28', '#5AA454', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
      
  }

  ngOnInit() {
     var single = [
  {
    "name": "Error",
    "value": 894
  },
  {
    "name": "Success",
    "value": 500
  }
]; 

    Object.assign(this, {single}) 
  }


}
