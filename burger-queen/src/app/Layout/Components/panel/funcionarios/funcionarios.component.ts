import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { User } from 'src/app/Models/Usuario';
import { ErrorListComponent } from 'src/app/Shared/Components/error-list/error-list.component';
import { UserService } from 'src/app/Shared/Services/Users/user.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  usuarios$: Observable<User[]>;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.usuarios$ = this.userService.listUsers().pipe(
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

  deleteUser(user: User) {
    if (user.id) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.usuarios$ = this.userService.listUsers().pipe(
          catchError(error => {
            this.onError('Erro ao carregar a lista de usuários. 😕');
            return of([]);
          })
        );
      });
    }
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(() => {
          this.usuarios$ = this.userService.listUsers().pipe(
            catchError(error => {
              this.onError('Erro ao carregar a lista de usuários. 😕');
              return of([]);
            })
          );
        });
      }
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {name: '', email: '', role: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.registerUser(result).subscribe(() => {
          this.usuarios$ = this.userService.listUsers().pipe(
            catchError(error => {
              this.onError('Erro ao carregar a lista de usuários. 😕');
              return of([]);
            })
          );
        });
      }
    });
  }
}
