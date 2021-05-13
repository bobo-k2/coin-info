import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-angular';

  @Input() data?: any;

  async ngOnInit() {
    // await this.getData();
    this.data = [
      {
        id: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        quote: {
          USD: {
            percent_change_24h: -3.24931758,
          },
        },
      },
      {
        id: 1027,
        name: 'Ethereum',
        symbol: 'ETH',
        quote: {
          USD: {
            percent_change_24h: 1.24931758,
          },
        },
      },
    ];
  }

  async getData() {
    const response = await fetch('api/listings/?start=1&limit=12&convert=USD');
    const body = await response.json();
    this.data = body.data;
  }
}
