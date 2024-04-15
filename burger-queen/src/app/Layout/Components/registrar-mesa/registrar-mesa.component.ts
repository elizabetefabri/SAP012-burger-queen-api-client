import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-registrar-mesa',
  templateUrl: './registrar-mesa.component.html',
  styleUrls: ['./registrar-mesa.component.css']
})
export class RegistrarMesaComponent implements OnInit{

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void { }

  deslogar(){
    this.auth.logout()
  }
}
