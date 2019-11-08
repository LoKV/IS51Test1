import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';


interface IOrder {
  pid: string;
  image: string;
  description: string;
  price: number;
  quantity: number;

}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  nameInput = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
  }

  async ngOnInit() {

  }

  async readFile() {
    const rows = await this.http.get('assets/orders.json').toPromise();
    this.orders = rows.json();
    return rows.json();
  }

  delete(index: number) {
    this.orders.splice(index, 1);
  }

  clear() {
    this.orders = [];
  }

  calculate() {
    if (this.nameInput === '') {
      alert('Name must not be empty!');
    } else if (this.nameInput.indexOf(',') === -1) {
      alert('Must have comma and a space!');
    } else {
      let total, subTotal, taxAmount;
      total = this.orders.reduce((acc, it, i, arr) => {
        acc += it.price * it.quantity;
        return acc;
      }, 0);
      taxAmount = total * .15;
      subTotal = total - taxAmount;
      alert('Thank you for your order, ' + this.nameInput + '.' + ' Your subtotal is: $'
        + subTotal + ', your tax amount is: $' + taxAmount + ' and your grand total is: $' + total + '.');
    }
  }

  addItem(item: string) {
    switch (item) {
      case 'Android':
        this.orders.unshift({
          'pid': '1',
          'image': 'assets/sm_android.jpeg',
          'description': 'Android',
          'price': 150.00,
          'quantity': 1
        });
        break;

      case 'IPhone':
        this.orders.unshift({
          'pid': '2',
          'image': 'assets/sm_iphone.jpeg',
          'description': 'IPhone',
          'price': 200.00,
          'quantity': 1
        });
        break;

      case 'Windows Phone':
        this.orders.unshift({
          'pid': '3',
          'image': 'assets/sm_windows.jpeg',
          'description': 'Windows Phone',
          'price': 110.00,
          'quantity': 1
        });
        break;
    }

  }




}
