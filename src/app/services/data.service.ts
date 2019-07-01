import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private serviceUrl: string = 'http://localhost:35874/';

    constructor(private http: Http) { }

    createUser(data: any) {
        return this.http
            .post(this.serviceUrl + 'v1/customers', data)
            .map((res: Response) => res.json());
    }

    authenticate(data: any) {
        const dt = 'grant_type=password&username=' + data.username + '&password=' + data.password;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.serviceUrl + 'v1/authenticate', dt, options).map((res: Response) => res.json());
    }

    getProducts() {
        return this.http
            .get(this.serviceUrl + 'v1/products')
            .map((res: Response) => res.json());
    }

    createOrder(data: any) {
        const token = localStorage.getItem('ms.token');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`); Headers
        const options = new RequestOptions({ headers: headers });
        return this.http
            .post(this.serviceUrl + 'v1/orders', data, options)
            .map((res: Response) => res.json());
    }

}