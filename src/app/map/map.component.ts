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
    this.aerodromes = new Array<Aerodrome>();
    this.vrps = new Array<VisualReportingPoint>();

    // TODO: move this out to live in Azure
    const aerodromesJson = {
      'aerodromes': [
        { 'name': 'Auckland', 'icao_id': 'NZAA', 'lat': -37.0029, 'long': 174.4730 },
        { 'name': 'Wellington', 'icao_id': 'NZWN', 'lat': -41.1938, 'long': 174.4819 },
        { 'name': 'Christchurch', 'icao_id': 'NZCH', 'lat': -43.2922, 'long': 172.3156 }
      ]
    };

    // build aerodrome objects from JSON (so we can move JSON to a GET request easily later)
    aerodromesJson.aerodromes.forEach((ad: any) => {
      let aerodrome = new Aerodrome(ad.name, ad.icao_id, ad.lat, ad.long);
      this.aerodromes.push(aerodrome);
    });
  }

  ngAfterViewInit() {
    this.mapInitialiser();
  }

  mapInitialiser() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.createAerodromeMarkers(this.aerodromes);
  }

  createAerodromeMarkers(aerodromes: Array<Aerodrome>) : Array<google.maps.Marker> {
    let markers = new Array<google.maps.Marker>();
    aerodromes.forEach((ad: Aerodrome) => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(ad.lat, ad.long),
        map: this.map
      });
      marker.addListener('click', this.handleMapClick);
      markers.push(marker);
    });

    return markers;
  }

  handleMapClick(data: any) {
    console.log(data);
  }
}
