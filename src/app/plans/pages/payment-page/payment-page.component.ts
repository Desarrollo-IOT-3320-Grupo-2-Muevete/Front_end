import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentComponent } from "../../components/payment/payment.component";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderAcquirerComponent } from "../../../public/components/header-acquirer/header-acquirer.component";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CommonModule,
    PaymentComponent,
    TranslateModule,
    HeaderAcquirerComponent
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  private router = inject(Router);

  // Variables para mostrar en el HTML
  selectedPlan: string = 'Unknown Plan';
  amount: number = 0;

  ngOnInit(): void {
    // 1. Recuperamos el nombre del plan guardado en la pantalla anterior
    const planName = localStorage.getItem('selectedPlan');

    if (planName) {
      this.selectedPlan = planName;
      this.calculatePrice(planName);
    } else {
      // Si no hay plan seleccionado, volvemos a la lista
      this.router.navigate(['/dashboard/plans']);
    }
  }

  // 2. Asignamos el precio según el nombre (debe coincidir con planes-page)
  private calculatePrice(name: string) {
    switch (name) {
      case 'Eco Pro':
        this.amount = 29.90;
        break;
      case 'Green Master':
        this.amount = 59.90;
        break;
      case 'Basic Plan':
        this.amount = 0.00;
        break;
      default:
        this.amount = 0.00;
        break;
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/plans']);
  }
}
