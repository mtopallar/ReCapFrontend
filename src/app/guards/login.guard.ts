import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  //ctor u ben dahil ettim guard ile otomatik oluşmuyor.
  constructor(
  private authService:AuthService,
  private toastrService:ToastrService,
  private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAuthenticated()){
        return true
      }else{
        this.router.navigate(["login"])
        this.toastrService.info("Sisteme giriş yapınız.")
        return false
      }
  }
  
}
