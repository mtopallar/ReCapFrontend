import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStarageService: LocalStorageService,
    private router:Router
  ) {}

  authenticationStatue = false;
  selectedUser: User;
  selectedUserDataLoaded = false;

  ngOnInit(): void {
    this.isAuthenticated();
    this.getAuthorizedUser();
  }

  isAuthenticated() {
    this.authenticationStatue = this.authService.isAuthenticated();
  }

  getAuthorizedUser() {
    let email: string = this.localStarageService.get('email');
    this.userService.getUserByMail(email).subscribe((response) => {
      this.selectedUser = response.data;
      this.selectedUserDataLoaded = true;
    });
  }

  logOut() {
    this.localStarageService.remove('token');
    this.localStarageService.remove('email');
    this.authenticationStatue=false
    this.router.navigate([""])
  }
}
