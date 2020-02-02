import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Aerodrome } from '../core/models/aerodrome.model';
import { VisualReportingPoint } from '../core/models/vrp.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  
  INITIAL_LAT = -41.2865;
  INITIAL_LONG = 174.7762;
  INITIAL_POS = new google.maps.LatLng(this.INITIAL_LAT, this.INITIAL_LONG);

  mapOptions: google.maps.MapOptions = {
    center: this.INITIAL_POS,
    zoom: 6
  };

  aerodromes: Array<Aerodrome>;
  vrps: Array<VisualReportingPoint>;

  // marker = new google.maps.Marker({
  //   position: this.coordinates,
  //   map: this.map,
  // });

  constructor() {
    // TODO: move this out to a database call from Azure
  }

  ngAfterViewInit() {
    this.mapInitialiser();
  }

  mapInitialiser() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    // this.marker.setMap(this.map);
  }

}
