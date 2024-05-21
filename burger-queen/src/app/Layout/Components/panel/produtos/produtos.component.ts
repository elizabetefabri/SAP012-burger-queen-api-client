import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { Product } from 'src/app/Models/Produto';
import { ProductService } from 'src/app/Shared/Services/Products/product.service';
import { ErrorListComponent } from 'src/app/Shared/Components/error-list/error-list.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  products$: Observable<Product[]>;

  constructor(
    private product: ProductService,
    public dialog: MatDialog
  ) {
    this.products$ = this.product.listProducts().pipe(
      catchError(error => {
        this.onError('Erro ao carregar a lista de usuários. 😕');
        return of([]);
      })
    );
  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorListComponent, {
      data: errorMsg
    });
  }

  deleteProduct(product: Product) {
    if (product.id) {
      this.product.deleteProduct(product.id).subscribe(() => {
        this.products$ = this.product.listProducts().pipe(
          catchError(error => {
            this.onError('Erro ao carregar a lista de usuários. 😕');
            return of([]);
          })
        );
      });
    }
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.product.updateProduct(result).subscribe(() => {
          this.products$ = this.product.listProducts().pipe(
            catchError(error => {
              this.onError('Erro ao carregar a lista de usuários. 😕');
              return of([]);
            })
          );
        });
      }
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: {name: '', price: '', image: '', type: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.product.registerProduct(result).subscribe(() => {
          this.products$ = this.product.listProducts().pipe(
            catchError(error => {
              this.onError('Erro ao carregar a lista de produtos. 😕');
              return of([]);
            })
          );
        });
      }
    });
  }
}
