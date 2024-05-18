import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/Authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog

  ) {}
  ngOnInit(): void {}

  closeButton(): void {
    this.auth.logout();
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }
}
