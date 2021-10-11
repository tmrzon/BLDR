import { Component, OnInit } from '@angular/core';
import { stat } from 'fs';
import { HttpService } from 'src/app/SERVICES/http-ser.service';
import { SocketioService } from 'src/app/SERVICES/socketio.service';
import { Statistics } from '../../CLASSES/statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistics: Statistics;

  boxStyling = [
    'transparent linear-gradient(219deg, #5475E3 0%, #C367C7 100%) 0% 0% no-repeat padding-box',
    'transparent linear-gradient(219deg, #FD51DB 0%, #E467E0 13%, #6CD1F7 83%, #4EECFD 100%) 0% 0% no-repeat padding-box',
    'transparent linear-gradient(219deg, #FDC551 0%, #FD4EA1 100%) 0% 0% no-repeat padding-box',
    'transparent linear-gradient(219deg, #01DBD8 0%, #02E79D 100%) 0% 0% no-repeat padding-box'
  ]

  dateStatus: number = 1; //day

  constructor(private http: HttpService, private socketService: SocketioService) { }

  ngOnInit(): void {  
    this.socketService.setupSocketConnection();
    this.loadData();
  }

  loadData() {
    this.http.getStatistics().subscribe(data => {
      this.statistics = data.data;
      //console.log(data);
      console.log('locations:---------------')
      console.log(this.statistics.locations);
      console.log(this.statistics);

    })
  }

}
