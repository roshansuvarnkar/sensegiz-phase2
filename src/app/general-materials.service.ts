import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class GeneralMaterialsService {

  constructor(private _snackBar: MatSnackBar,private toast: ToastrService) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // showWarning(message){
  //       this.toast.warning(message)
  //   }
  //

}
