import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from 'src/app/interfaces/experience';
import { ServiceService } from 'src/app/service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-esperienze',
  templateUrl: './esperienze.component.html',
  styleUrls: ['./esperienze.component.scss']
})
export class EsperienzeComponent {

  formData:Partial<IExperience> = {
    role: '',
    company: '',
    startDate: '',
    area: '',
    description: '',
    endDate: ''
  }

  id!:string
  experiences!:IExperience[]

  constructor(
    private svc: ServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ){}

  openModal(content: any) {
    this.modalService.open(content);
  }

  form!:FormGroup;

  ngOnInit(){
    this.svc.getMe().subscribe(profile => {
      this.id = profile._id
      this.svc.getExp(this.id).subscribe(exps => {
        this.experiences = exps
      })
    })
    this.form = this.fb.group({
      company:this.fb.control(null, [Validators.required]),
      startDate:this.fb.control(null, [Validators.required]),
      area: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null,[Validators.required]),
      role: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required]),
    })
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid
   }
   isTouched(fieldName: string) {
     return this.form.get(fieldName)?.touched
   }

   register() {
    this.formData = this.form.value
    this.svc.postExp(this.id, this.formData).subscribe(() => {
      this.modalService.dismissAll()
      this.svc.getExp(this.id).subscribe(exps => {
        this.experiences = exps
      })
    })
  }

}
