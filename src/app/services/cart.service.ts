import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartService {
    public items: any[] = [];
    cartChange: Observable<any>;
    cartChangeObserver: Observer<any>;

    constructor() {
        this.cartChange = new Observable((observer: Observer<any>) => {
            this.cartChangeObserver = observer;
        });
    }

    addItem(item) {
        this.getItems();
        if (this.hasItem(item.id)) {
            this.updateQuantity(item.id, 1);
        } else {
            this.items.push(item);
        }
        localStorage.setItem('ms.cart', JSON.stringify(this.items));
        this.cartChangeObserver.next(this.items);
    }

    save() {
        localStorage.setItem('ms.cart', JSON.stringify(this.items));
    }

    load() {
        const data = localStorage.getItem('ms.cart');
        if (data) {
            this.items = JSON.parse(data);
        }
        this.cartChangeObserver.next(this.items);
    }

    hasItem(id: any): boolean {
        for (const i of this.items) {
            if (i.id === id) {
                return true;
            }
        }
        this.cartChangeObserver.next(this.items);
        return false;
    }

    updateQuantity(id: any, quantity: number) {
        for (const i of this.items) {
            if (i.id === id) {
                i.quantity += +quantity;
            }
        }
        this.cartChangeObserver.next(this.items);
    }

    getItems(): any[] {
        const data = localStorage.getItem('ms.cart');
        if (data) {
            this.items = JSON.parse(data);
        }
        this.cartChangeObserver.next(this.items);
        return this.items;
    }

    removeItem(id: string) {
        for (const item of this.items) {
            if (item.id === id) {
                const index = this.items.indexOf(item);
                this.items.splice(index, 1);
            }
        }
        localStorage.setItem('ms.cart', JSON.stringify(this.items));
        this.cartChangeObserver.next(this.items);
    }

    getSubTotal(): number {
        let result = 0;
        for (const i of this.items) {
            result += +(+i.price * +i.quantity);
        }
        this.cartChangeObserver.next(this.items);
        return result;
    }


    clear() {
        this.items = [];
        localStorage.removeItem('ms.cart');
        this.cartChangeObserver.next(this.items);
    }
}