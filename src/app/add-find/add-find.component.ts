import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-find',
  templateUrl: './add-find.component.html',
  styleUrls: ['./add-find.component.css']
})
export class AddFindComponent implements OnInit {
Findform:FormGroup
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddFindComponent>,
    @Inject(MAT_DIALOG_DATA)  data) {
      console.log("data===",data)
  }



  ngOnInit(): void {
    this.Findform = this.fb.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
  }

onNoClick(): void {
  this.dialogRef.close();
}

submit(data){
  console.log("data===",data);

}


}
