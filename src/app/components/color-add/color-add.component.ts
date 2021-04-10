import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService
    ) { }

    colorAddForm:FormGroup
  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({      
      name:["",Validators.required],
    })
  }

  addColor(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if (responseError.error.ValidationErrors.length > 0) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }      
      })
    }else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }
  }
}
