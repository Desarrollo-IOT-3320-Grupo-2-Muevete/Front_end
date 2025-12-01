import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { Vehicle } from '../../../../vehicles/model/vehicle.entity';
import { VehicleService } from '../../../../vehicles/services/vehicle.service';
import { HeaderAcquirerComponent } from '../../../../public/components/header-acquirer/header-acquirer.component';
import { LogoApiService } from '../../../../shared/services/logo-api.service';

@Component({
  selector: 'app-filter-acquirer',
  standalone: true,
  imports: [
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    TranslateModule,
    HeaderAcquirerComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './filter-acquirer.component.html',
  styleUrls: ['./filter-acquirer.component.css']
})
export class FilterAcquirerComponent implements OnInit {

  // allVehicles guarda TODOS los datos originales
  private allVehicles: Vehicle[] = [];
  // vehicleData es lo que se MUESTRA en pantalla (filtrado)
  public vehicleData: Vehicle[] = [];

  private vehicleService: VehicleService = inject(VehicleService);
  private Logo = inject(LogoApiService);

  selectedType: string = 'All types';
  selectedPrice: string = 'Lowest to Highest';

  // 👇 IMPORTANTE: Asegúrate de que estos nombres coincidan con los que guardas en la base de datos
  types: string[] = ['All types', 'Scooter', 'Electric bicycle', 'Skateboard', 'Bicycle', 'Monopatin', 'Jet', 'BMX'];

  getLogoUrl(url: string) {
    return this.Logo.getUrlToLogo(url);
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  // 1. Cargamos todos los vehículos UNA sola vez
  private loadVehicles() {
    this.vehicleService.getAll().subscribe((response: Vehicle[]) => {
      this.allVehicles = response;
      this.vehicleData = response; // Al inicio mostramos todo
      this.applyFilters(); // Aplicamos ordenamiento inicial
    });
  }

  // 2. Filtramos localmente (Es instantáneo y no falla)
  onTypeChange(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  onPriceChange(price: string) {
    this.selectedPrice = price;
    this.applyFilters();
  }

  // Lógica centralizada de filtrado y ordenamiento
  private applyFilters() {
    // Paso 1: Filtrar por tipo
    let filtered = [...this.allVehicles];

    if (this.selectedType !== 'All types') {
      // Filtramos ignorando mayúsculas/minúsculas para evitar errores
      filtered = filtered.filter(v =>
        v.type && v.type.toLowerCase() === this.selectedType.toLowerCase()
      );
    }

    // Paso 2: Ordenar por precio
    if (this.selectedPrice === 'Lowest to Highest') {
      filtered.sort((a, b) => a.priceSell - b.priceSell);
    } else {
      filtered.sort((a, b) => b.priceSell - a.priceSell);
    }

    // Actualizamos la vista
    this.vehicleData = filtered;
  }
}
