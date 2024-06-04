import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    constructor(private readonly httpClient:HttpClient){ }

    login(username:string, password:string) {
        const url = 'http://127.0.0.1:8000/api/auth/login/'
        return this.httpClient.post(url, {username, password})
    }

    logout() {
        localStorage.removeItem("user")
    }

    isAuthenticated() {
        return !!localStorage.getItem("user")
    }

    getUsername() {
        return localStorage.getItem("user")
    }
}