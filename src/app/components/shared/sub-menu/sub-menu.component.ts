import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html'
})
export class SubMenuComponent implements OnInit {
  public totalItems: number = 0;
  public user: string = '';

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cartChange.subscribe((data) => {
      console.log(data);
      this.totalItems = data.length;
    });

    const data: any = JSON.parse(localStorage.getItem('ms.user'));
    if (data) {
      this.user = data.name;
    }

    this.cartService.load();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('ms.token');
    localStorage.removeItem('ms.user');
    this.router.navigateByUrl('/');
  }
}
