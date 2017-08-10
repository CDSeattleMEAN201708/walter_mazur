import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us-timezones',
  templateUrl: './us-timezones.component.html',
  styleUrls: ['./us-timezones.component.css']
})
export class UsTimezonesComponent implements OnInit {
  title = 'US Timezone Display';
  time
  zone
  selected = 'clear';

  constructor() { }

  ngOnInit() {
    this.getDate('pst')
  }

  getDate(zone){
    this.selected = zone

    switch(zone){
      case 'cst':
        this.time = Date.now()
        this.zone = 'Central Standard Time'
        break;
      case 'pst':
        this.time = Date.now() - (3600000 * 2)
        this.zone = 'Pacific Standard Time'
        break;
      case 'mst':
        this.time = Date.now() - 3600000
        this.zone = 'Mountain Standard Time'
        break;
      case 'est':
        this.time = Date.now() + 3600000
        this.zone = 'Eastern Standard Time'
        break;
      default:
        this.time = ''
        this.zone = ''
    }
  }
}
