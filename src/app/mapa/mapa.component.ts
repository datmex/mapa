import { Component, OnInit } from '@angular/core';
import { InegiService } from '../service/inegi.service';

declare let L;
var map;
var redIcon;
var blueIcon;
var LeafIcon;
var lat,lng,radio;
var cont = false;
var places = {};
var consultas = 0;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})

export class MapaComponent implements OnInit {
  tempMarker: any;
  markersname: any;
  public array;
  public prods
  latitud;
  longitud;
  show = false;
  radios=[{
    radio: 200
  },{
    radio: 300
  },{
    radio: 400
  },{
    radio: 500
  },{
    radio: 600
  },{
    radio: 700
  },{
    radio: 800
  }]
  constructor(private inegi: InegiService) {}
   
  async ngOnInit() {
    this.show = false;
    map = L.map('map').setView([21.882969, -102.293025],14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      //maxZoom: 16
  }).addTo(map);

  LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize:     [25, 41], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [14, 41], // point of the icon which will correspond to marker's location
      shadowAnchor: [14, 42],  // the same for the shadow
      popupAnchor:  [-3, -76] 
    }
  });
  blueIcon = new LeafIcon({iconUrl: 'assets/leaflet/marker-icon.png'}),
      redIcon = new LeafIcon({iconUrl: 'assets/leaflet/red.png'});
      L.icon = function (options) {
        return new L.Icon(options);
      };
    //L.marker([21.95420276,-102.32637506],{icon: this.redIcon}).addTo(map)//.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
    //L.marker([21.95183458,-102.32544212],{icon: this.blueIcon}).addTo(map)//.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
    //var marker = L.marker([21.95538478,-102.323977],{icon: this.blueIcon}).addTo(map)
    //var marker = L.marker([21.95320076,-102.32637506]).addTo(map)//.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
    //marker.on("popupopen", this.onPopupOpen);  
    //marker.name="TESTNAMEMARKER1";
    //markers.push(marker);
  }

  getCoor(rad){
    var contador = 0;
    var theMarker = {};
    map.on('click',(e) =>{
      contador += 1;
      if(contador == 1){
        cont = true;
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        if (theMarker != undefined) {
          map.removeLayer(theMarker);
        };
        if(cont){
          this.findLoc(lat,lng,rad);
        }
        cont = false;
        theMarker = L.marker([lat,lng],{icon: redIcon}).addTo(map);
      }
    });
  }

  async findLoc(lat,lng,rad){
    this.show = true;
    this.latitud = lat;
    this.longitud = lng;
    const res = await this.inegi.findLoc(lat,lng,rad);
    if(places != undefined){
      var cont = 0;
      map.eachLayer(function (layer) {
        cont ++ ;
        if(cont > 1){
          map.removeLayer(layer);
        }
      });
    }
    this.array = res;
    places = L.marker([lat,lng],{icon: redIcon}).addTo(map);
    L.circle([lat, lng], {radius: (rad)}).addTo(map);
    //this.array.forEach((uno,i) => {
      //var loc = uno['location']['coordinates'];
    //  places = L.marker([loc[1],loc[0]],{icon: blueIcon}).addTo(map);//.bindPopup(uno['nom_estab']).openPopup();
    //});
  }


  async busca_prods(prod){
    var find = 0;
    var pos=[];
    var cont = 0;
    const res = await this.inegi.findbyprod(prod);
    this.prods = res;
    for (var i = 0, len = this.array.length; i < len; i++) {
      for( var j = 0, len2 = this.prods.length; j < len2; j++){
        if(this.array[i]['codigo_act'] == this.prods[j]['codigo']){
          find += 1;
          if(find == 1){
            this.clearMap();
          }
          var loc = this.array[i]['location']['coordinates'];
          places = L.marker([loc[1],loc[0]],{icon: blueIcon}).addTo(map).bindPopup(this.array[i]['nom_estab']+"<br />"+this.prods[j]['productos']);
          pos[cont]=this.array[i];
          cont++;
        }
      }
    }
    if(pos.length < 1){
      //this.show = false;
     alert("no se encontró lo que buscabas");
    }else{
      this.array = pos;
    }
  }

  clearMap(){
    if(places != undefined){
      var cont = 0;
      map.eachLayer(function (layer) {
        cont ++ ;
        if(cont > 1){
          map.removeLayer(layer);
        }
      });
    }
    places = L.marker([this.latitud,this.longitud],{icon: redIcon}).addTo(map);
  }

}  
