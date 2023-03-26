import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/model/Persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {

persona: persona = null;


constructor(private activatedRouter: ActivatedRoute, private personaService: PersonaService, private router: Router, public imageService: ImageService){

}


ngOnInit(): void {
  const id = this.activatedRouter.snapshot.params['id'];
  this.persona.imagen = this.imageService.url;
  this.personaService.detail(id).subscribe(
    data => {
      this.persona = data;
    }, err => {
      alert("Hubo un error al modificar la informacion");
      this.router.navigate(['']);
    }
  )
}


uploadImage($event: any){
  const id = this.activatedRouter.snapshot.params['id'];
  const name = "perfil_" + id;
  this.imageService.uploadImage($event, name);
}


onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.update(id, this.persona).subscribe(
      data =>{
        this.router.navigate(['']);
      }, err => {
      alert("Hubo un error al modificar la informacion");
      this.router.navigate(['']);
      }
    )
}



}
