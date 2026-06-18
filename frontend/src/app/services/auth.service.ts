import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = "http://localhost:8080/api/auth";
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl + "/login", {
      username: username,
      password: password,
    });
  }

  saveUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  getUser() {
    let user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  isLoggedIn() {
    return this.getUser() != null;
  }
  isAdmin() {
    let user = this.getUser();
    return user && user.role == "admin";
  }
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
