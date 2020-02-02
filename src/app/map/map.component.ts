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
  icons: {};

  constructor() {
    this.aerodromes = new Array<Aerodrome>();
    this.vrps = new Array<VisualReportingPoint>();

    // TODO: move this out to live in Azure
    const aerodromesJson = {
      'aerodromes': [
        { 'name': 'Auckland Airport', 'icao_id': 'NZAA', 'lat': -37.0029, 'long': 174.4730 },
        { 'name': 'Wellington', 'icao_id': 'NZWN', 'lat': -41.1938, 'long': 174.4819 },
        { 'name': 'Christchurch', 'icao_id': 'NZCH', 'lat': -43.2922, 'long': 172.3156 }
      ]
    };

    const vrpsJson = {
      'visual_reporting_points': [
        { 'name': 'Flags', 'lat': -43.2311, 'long': 172.21242 },
        { 'name': 'Winton', 'lat': -46.0823, 'long': 168.1933 },
        { 'name': 'Mount Hyde', 'lat': -45.4725, 'long': 170.1717 },
        { 'name': 'LPG Terminal', 'lat': -37.0212, 'long': 174.4941 },
        { 'name': 'Manawatu River Mouth', 'lat': -40.2836, 'long': 175.1255 }
      ]
    };

    // build aerodrome objects from JSON (so we can move JSON to a GET request easily later)
    aerodromesJson.aerodromes.forEach((ad: any) => {
      this.aerodromes.push(new Aerodrome(ad.name, ad.icao_id, ad.lat, ad.long));
    });

    vrpsJson.visual_reporting_points.forEach((vrp: any) => {
      this.vrps.push(new VisualReportingPoint(vrp.name, vrp.lat, vrp.long));
    });
  }

  ngAfterViewInit() {
    this.mapInitialiser();
  }

  mapInitialiser() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.loadIcons();
    this.setAerodromeMarkers(this.aerodromes);
    this.setVrpMarkers(this.vrps);
  }

  loadIcons() {
    const iconBase = 'http://maps.google.com/mapfiles/kml/'

    this.icons = {
      aerodrome: {
        icon: iconBase + 'pal2/icon56.png'
      },
      vrp: {
        icon: iconBase + 'pal5/icon13.png'
      }
    };
  }

  setAerodromeMarkers(aerodromes: Array<Aerodrome>) {
    let markers = new Array<google.maps.Marker>();
    aerodromes.forEach((ad: Aerodrome) => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(ad.lat, ad.long),
        icon: this.icons['aerodrome'].icon,
        map: this.map
      });
      marker.addListener('click', this.handleMapClick);
    });
  }

  setVrpMarkers(vrps: Array<VisualReportingPoint>) {
    let markers = new Array<google.maps.Marker>();
    vrps.forEach((vrp: VisualReportingPoint) => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(vrp.lat, vrp.long),
        icon: this.icons['vrp'].icon,
        map: this.map
      });
      marker.addListener('click', this.handleMapClick);
    });
  }

  handleMapClick(data: any) {
    console.log(data);
  }
}
