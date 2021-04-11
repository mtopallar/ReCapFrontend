import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  authorizedUser:User
  authorizedUserDataLoaded=false
  updateUserForm:FormGroup

  ngOnInit(): void {
    this.createUpdateUserForm()
    this.getAuthorizedUserInfo()
  }

  createUpdateUserForm(){
    this.updateUserForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],     
    })
  }

  getAuthorizedUserInfo(){
    let authorizedUserMail:string= this.localStorageService.get("email")    
    this.userService.getUserByMail(authorizedUserMail).subscribe(response=>{
      this.authorizedUser=response.data
      this.authorizedUserDataLoaded=true
    })
  }

  update(){

    
    if(this.updateUserForm.valid){      
      let userModel:User = Object.assign({}, this.updateUserForm.value)
      userModel.passwordHash = this.authorizedUser.passwordHash,
      userModel.passwordSalt=this.authorizedUser.passwordSalt,
      userModel.status=this.authorizedUser.status
      userModel.id=this.authorizedUser.id      
      this.userService.updateUser(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.localStorageService.remove("email")
        this.localStorageService.set("email", userModel.email)
        this.router.navigate([""])
      },responseError=>{
        this.toastrService.error(responseError.error,"Hata")
      })
    }
  }

}
