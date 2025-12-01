import { Component, inject, OnInit } from '@angular/core'; // Agregamos inject
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Agregamos Router
import { HeaderAcquirerComponent } from "../../../public/components/header-acquirer/header-acquirer.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-planes-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderAcquirerComponent,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './planes-page.component.html',
  styleUrl: './planes-page.component.css'
})
export class PlanesPageComponent implements OnInit {

  private router = inject(Router); // Inyectamos el Router

  planes: any[] = [
    {
      id: 1, // Agregué IDs ficticios
      name: 'Basic Plan',
      price: 0,
      features: ['Access to basic scooters', 'Pay per ride', 'Standard support'],
      color: 'bg-gray-100',
      btnColor: 'primary'
    },
    {
      id: 2,
      name: 'Eco Pro',
      price: 29.90,
      features: ['Unlimited unlocks', '10% discount on rides', 'Priority support', 'Access to Pro bikes'],
      color: 'bg-green-50',
      btnColor: 'accent',
      recommended: true
    },
    {
      id: 3,
      name: 'Green Master',
      price: 59.90,
      features: ['All Eco Pro benefits', 'Free helmet rental', 'Insurance included', 'Family account (2 users)'],
      color: 'bg-gray-100',
      btnColor: 'primary'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  selectPlan(planName: string) {
    // 1. Guardamos el plan seleccionado para saber qué cobrar después
    localStorage.setItem('selectedPlan', planName);

    // 2. Redirigimos a la pantalla de pago
    console.log(`Plan seleccionado: ${planName}. Redirigiendo a pago...`);
    this.router.navigate(['/payment']);
  }
}
