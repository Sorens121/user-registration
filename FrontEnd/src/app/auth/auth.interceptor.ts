import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            const clonereq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonereq).pipe(tap(
                event => {},
                err => {
                    if(err.errors.auth == false) {
                        this.router.navigateByUrl('/login');
                    }
                }
            ));
        }
    }
}