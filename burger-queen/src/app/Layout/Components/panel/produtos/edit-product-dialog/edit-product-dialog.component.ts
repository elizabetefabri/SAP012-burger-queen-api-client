import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/Models/Produto';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  editProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.editProductForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      image: [data.image, Validators.required],
      tipo: [data.tipo, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
