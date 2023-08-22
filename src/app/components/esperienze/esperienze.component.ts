import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from 'src/app/interfaces/experience';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-esperienze',
  templateUrl: './esperienze.component.html',
  styleUrls: ['./esperienze.component.scss']
})
export class EsperienzeComponent {

  formData:IExperience = {
    role: '',
    company: '',
    startDate: '',
    area: '',
    description: '',
    _id: '',
    user: ''
  }

  id!:string
  experiences!:IExperience[]

  constructor(
    private svc: ServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ){}

  openModal(content: any) {
    this.modalService.open(content);
  }

  form!:FormGroup;

  ngOnInit(){
    this.svc.getMe().subscribe(profile=> this.id = profile._id)
    this.svc.getExp(this.id).subscribe( exps => this.experiences = exps)
    this.form = this.fb.group({
      company:this.fb.control(null, [Validators.required]),
      startDate:this.fb.control(null, [Validators.required]),
      area: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null,[Validators.required]),
      role: this.fb.control(null, [Validators.required]),
    })
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid
   }
   isTouched(fieldName: string) {
     return this.form.get(fieldName)?.touched
   }

   register(){
    this.svc.postExp(this.id).subscribe()
   }

}
