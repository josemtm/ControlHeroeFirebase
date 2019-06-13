import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import Swal from "sweetalert2"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get("id");

    if(id !== "nuevo"){
      this.heroesService.getHeroe(id).subscribe( (resp:HeroeModel) =>{

        this.heroe=resp
        this.heroe.id = id;
        
      })
    }

  }

  guardar(forma:NgForm){

    if (forma.invalid){
      console.log("formulario no valido");
      return;
    }

    Swal.fire({
      title:"Espere",
      text: "Guardando informacion",
      type: "info",
      allowOutsideClick: false
    })
    Swal.showLoading

    let peticion : Observable<any>

    if (this.heroe.id){
    peticion =  this.heroesService.actualizarHeroe(this.heroe)
    }
    else {
     peticion = this.heroesService.crearHeroe(this.heroe)
    }

    peticion.subscribe(resp=>{

      Swal.fire({
        title:this.heroe.nombre,
        text:"Se actualizo el heroe",
        type:"success"
      })

    })

  }

}
