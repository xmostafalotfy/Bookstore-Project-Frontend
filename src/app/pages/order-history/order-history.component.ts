import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 1;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadOrders( this.currentPage, this.itemsPerPage);
  }

  loadOrders(page: number, limit: number): void {
    this.orderService.getUserOrders( page, limit).subscribe((data) => {
      if (data) {
        this.orders = data.orders;
        this.totalItems = data.pagination.total;
        this.totalPages = data.pagination.pages;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOrders( this.currentPage, this.itemsPerPage);
  }
}