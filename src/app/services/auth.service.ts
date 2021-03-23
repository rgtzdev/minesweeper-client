import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService { 

    private user: BehaviorSubject<User> = new BehaviorSubject(this.getCurrentUser())
    public currentUser = this.user.asObservable()

    constructor(private http: HttpClient) {}

    register = (
        user: User
    ) => this.http
        .post(
            `${environment.apiUrl}/auth/register/`,
            user
        ).toPromise()

    login = (
        user: User
    ) => this.http
        .post(
            `${environment.apiUrl}/auth/login/`,
            user
        ).toPromise()

    changeCurrentUser(user: User) {
        this.user.next(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    getCurrentUser(): User {
        const temp = localStorage.getItem('user')
        return temp ? JSON.parse(temp) : null
    }
}