import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-admin',
  templateUrl: './color-admin.component.html',
  styleUrls: ['./color-admin.component.css']
})
export class ColorAdminComponent implements OnInit {

  constructor(
    private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,    
    ) { }

  allColors:Color[];
  selectedColor: Color;
  allColorsDataLoaded=false
  selectedColorDataLoaded=false
  selectionForAdd:boolean =true
  selectionForEdit:boolean =false
  colorUpdateForm: FormGroup;
  colorAddForm: FormGroup;

  ngOnInit(): void {
    this.getAllColors();
    this.createAddColorForm()    
  }

  selectionAdd(selection:boolean){
    this.selectionForAdd=selection;
    this.selectionForEdit=false;
    this.resetSelectedColor(false)    
  }
  selectionEdit(selection:boolean){
    this.selectionForAdd=false;
    this.selectionForEdit=selection    
  }

  createColorUpdateForm() {    
    this.colorUpdateForm = this.formBuilder.group({      
      name:["",Validators.required]
    });    
}
createAddColorForm() {    
  this.colorAddForm = this.formBuilder.group({
    name:["",Validators.required]
  });    
}

addColor(){
if (this.colorAddForm.valid){
  let brandModel = Object.assign({},this.colorAddForm.value)
  this.colorService.addColor(brandModel).subscribe(response=>{
    this.toastrService.success(response.message, 'Başarılı');
    this.colorAddForm.reset();
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

  resetSelectedColor(newValue:boolean){
    this.selectedColorDataLoaded=newValue
  }

  getAllColors(){
    this.colorService.getColors().subscribe(response=>{
      this.allColors=response.data
      this.allColorsDataLoaded=true;
    })
  }

  getColorByColordId(id:number){    
    this.createColorUpdateForm()
    this.colorService.getColorByColorId(id).subscribe(response=>{
      this.selectedColor=response.data
      this.selectedColorDataLoaded=true      
    })
  }

  updateColor(){
    if (this.colorUpdateForm.valid){
      let colorModel:Color = Object.assign({},this.colorUpdateForm.value)
      colorModel.id=this.selectedColor.id      
      this.colorService.updateColor(colorModel).subscribe(response=>{
        this.toastrService.success(response.message, 'Başarılı');
        this.colorUpdateForm.reset();
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

  deleteColor(id:number){
     let colorToDelete:Color
     this.colorService.getColorByColorId(id).subscribe(response=>{ colorToDelete=response.data
      this.colorService.deleteColor(colorToDelete).subscribe(response=>{
      this.toastrService.success(response.message,"Silindi")
    },responseError=>{
      this.toastrService.error(responseError.message)
    })
     },responseError=>{
       this.toastrService.error("Belirtilen markaya ulaşılamadı.","Hata")
     })    
   }

}
