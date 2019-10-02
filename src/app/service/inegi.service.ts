import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class InegiService{

    //url = 'http://172.16.106.41:5000'; // internal ip
    url = 'http://192.168.1.76:5000';

    constructor(private http : HttpClient){}


    findLoc(lat,long,rad){
        const obj = {
            lat: lat,
            long: long,
            rad: rad
        }
        return this
        .http
        .post(`${this.url}/findloc`,obj).toPromise();
    }

    findbyprod(prod){
        const obj = {
          prod:prod
        }
        return this
        .http
        .post(`${this.url}/producto`,obj).toPromise();
    }
/*
    editUser(id_user,nombre_usuario,email,pass){
        const obj = {
            id_user:id_user,
            nombre_usuario: nombre_usuario,
            email: email,
            pass: pass
        };
        console.log(obj);
        this.http.post(`${this.url}/add/editUser`,obj).subscribe(res=> console.log('Done'));
    }

    addUser(nombre_usuario, nombre, ape_pat, ape_mat, email, fecha_nac, pass, id, id2){
        const obj = {
            nombre_usuario: nombre_usuario,
            nombre: nombre,
            ape_pat: ape_pat,
            ape_mat: ape_mat,
            email: email,
            fecha_nac: fecha_nac,
            pass: pass,
            id_user: id,
            id_amigo: id2
        };
        console.log(obj);
        this.http.post(`${this.url}/add/user`,obj).subscribe(res=> console.log('Done'));
    }

    getBusinesses() {
        return this
            .http
            .get(`${this.url}`);
    }
      
    editBusiness(id) {
        return this
            .http
            .get(`${this.url}/edit/${id}`);
    }

    updateBusiness(person_name, business_name, business_gst_number, id) {
        console.log("entra a update");
        const obj = {
            person_name: person_name,
            business_name: business_name,
            business_gst_number: business_gst_number
          };
        this
          .http
          .post(`${this.url}/update/${id}`, obj)
          .subscribe(res => console.log('Done'));
    }

    deleteBusiness(id){
        return this.http.get(`${this.url}/delete/${id}`);
    }

    findUser(email){
        return this
            .http
            .get(`${this.url}/findUser/${email}`).toPromise();
    }

    findMaxUser(){
        return this
            .http
            .get(`${this.url}/findMaxUser`).toPromise();
    }

    allRolas(){
        return this.http.get(`${this.url}/allRolas`).toPromise();
    }

    findRola(rola){
        return this
        .http
        .get(`${this.url}/findRola/${rola}`).toPromise();
    }

    playlist(artista){
        return this
        .http
        .get(`${this.url}/playlist/${artista}`).toPromise();
    }

    findArtista(artista){
        return this
        .http
        .get(`${this.url}/Artista/${artista}`).toPromise();
    }
    
    findRolas_artista(artista){
        return this
        .http
        .get(`${this.url}/findRolaArtista/${artista}`).toPromise();
    }

    top_rolas(){
        return this
        .http
        .get(`${this.url}/topRolas/`).toPromise();
    }

    elimina_user(user){
        return this
        .http
        .get(`${this.url}/eliminaUser/${user}`).toPromise();
    }

    suscripcion(id){
        return this
        .http
        .get(`${this.url}/suscripcion/${id}`).toPromise();
    }
    
*/
}