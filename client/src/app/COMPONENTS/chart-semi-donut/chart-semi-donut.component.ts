import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  ChartComponent } from "ng-apexcharts";
import { DisplayArr } from '../../CLASSES/statistics';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexGrid,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid
  colors: String[];
  labels: any;
};

@Component({
  selector: 'app-chart-semi-donut',
  templateUrl: './chart-semi-donut.component.html',
  styleUrls: ['./chart-semi-donut.component.scss']
})
export class ChartSemiDonutComponent implements OnInit {
  
  @ViewChild("chart") chart: ChartComponent;
  @Input() displayArr:DisplayArr[];
  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      // series: [44, 55, 41, 17, 15],
      series: this.displayArr.map(item => item.amount),
      chart: {
        width: 380,
        type: "donut"
      },
      // labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      labels: this.displayArr.map(item => item.title),
      colors: ['#FBCD4F', '#D69E02', '#F0BE36', '#FFF3D1'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }
}
