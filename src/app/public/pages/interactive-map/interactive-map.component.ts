import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {GoogleMap, MapMarker} from "@angular/google-maps";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";
import {TranslateModule} from "@ngx-translate/core";
import {Vehicle} from '../../../vehicles/model/vehicle.entity';
import {VehicleService} from '../../../vehicles/services/vehicle.service';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, NgForOf, HeaderAcquirerComponent, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css'
})
export class InteractiveMapComponent implements OnInit, OnDestroy {
  center: google.maps.LatLngLiteral = { lat: -12.098089934437155, lng: -77.05815168994613 };
  zoom = 12;
  display: google.maps.LatLngLiteral | undefined;
  protected vehicleData: Vehicle[] = [];

  private vehicleService: VehicleService = inject(VehicleService);
  private router: Router = inject(Router);

  // Variable para guardar el intervalo y poder destruirlo al salir
  private updateInterval: any;

  ngOnInit() {
    this.loadMarkers();

    // Guardamos la referencia del intervalo
    this.updateInterval = setInterval(() => {
      this.loadMarkers();
    }, 5000);
  }

  // Importante: Limpiar el intervalo cuando el componente se destruye (cambias de página)
  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng!.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

  markers: Array<{ position: google.maps.LatLngLiteral, vehicleId: number }> = [];

  addMarkerAtPosition(lat: number, lng: number, vehicleId: number) {
    this.markers.push({ position: { lat, lng }, vehicleId });
  }

  private loadMarkers() {
    this.vehicleService.getAll().subscribe((response: Vehicle[]) => {
      this.vehicleData = response;

      // 👇 ESTA ES LA CORRECCIÓN CLAVE:
      // Limpiamos el array de marcadores antes de agregar los nuevos
      this.markers = [];

      response.forEach(vehicle => {
        // Solo agregamos si tiene coordenadas válidas
        if (vehicle.lat !== null && vehicle.lng !== null) {
          this.addMarkerAtPosition(vehicle.lat, vehicle.lng, vehicle.id);
        }
      });
    });
  }

  markerClick(vehicleId: number) {
    this.router.navigate(['/vehicleDetailsAcquirer', vehicleId]);
  }
}
