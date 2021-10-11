import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { DisplayArr } from '../../CLASSES/statistics';

import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: String[];
};

@Component({
  selector: 'app-chart-donut',
  templateUrl: './chart-donut.component.html',
  styleUrls: ['./chart-donut.component.scss']
})
export class ChartDonutComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() displayArr:DisplayArr[];
  
  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
      // series: [44, 55, 13, 43, 22],
      series: this.displayArr.map(item => item.amount),
      chart: {
        type: "donut"
      },
      labels: this.displayArr.map(item => item.title),
      // labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      colors: ['#FBCD4F', '#D69E02', '#F0BE36', '#FFF3D1'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
