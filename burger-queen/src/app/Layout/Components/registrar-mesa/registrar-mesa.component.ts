import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ProductsService } from 'src/app/Shared/Services/Products/products.service';

@Component({
  selector: 'app-registrar-mesa',
  templateUrl: './registrar-mesa.component.html',
  styleUrls: ['./registrar-mesa.component.css']
})
export class RegistrarMesaComponent implements OnInit{
  mesaId: string = '';

  constructor(private auth: AuthService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.mesaId = params["mesaId"] || '';
    });
   }

  deslogar(){
    this.auth.logout()
  }
}
