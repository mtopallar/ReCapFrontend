import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  brandAddForm: FormGroup;

  ngOnInit(): void {
    this.createAddBrandForm()
  }

  createAddBrandForm() {    
      this.brandAddForm = this.formBuilder.group({
        name:["",Validators.required]
      });    
  }

  addBrand(){
    if (this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastrService.success(response.message, 'Başarılı');
      },
      (responseError) => {
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
    }
    else {
      this.toastrService.error(
        'Giriş yaptığınız bilgileri kontrol ediniz.',
        'Dikkat'
      );
    }
  }
}
