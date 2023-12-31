import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from 'src/app/interfaces/experience';
import { ServiceService } from 'src/app/service.service';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { CustomDatePipe } from 'src/app/custom-date.pipe';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent {

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
  infoModal: any
  expId!:string

  constructor(
    private svc: ServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private customDatePipe: CustomDatePipe
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
      endDate: this.fb.control(null),
    })
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid
   }
   isTouched(fieldName: string) {
     return this.form.get(fieldName)?.touched
   }

   register() {
    const isEditMode = !!this.expId
    if (isEditMode) {
      const experienceToUpdate = this.experiences.find(exp => exp._id === this.expId)
      if (experienceToUpdate) {
        experienceToUpdate.role = this.form.value.role
        experienceToUpdate.company = this.form.value.company
        experienceToUpdate.startDate = this.form.value.startDate
        experienceToUpdate.area = this.form.value.area
        experienceToUpdate.description = this.form.value.description
        experienceToUpdate.endDate = this.form.value.endDate

        this.svc.putExp(this.id, this.expId, experienceToUpdate).subscribe(() => {
          this.modalService.dismissAll()
          this.svc.getExp(this.id).subscribe(exps => {
            this.experiences = exps
            this.form.reset()
          })
        })
      }
    } else {
      this.svc.postExp(this.id, this.form.value).subscribe(() => {
        this.modalService.dismissAll()
        this.svc.getExp(this.id).subscribe(exps => {
          this.experiences = exps
          this.form.reset()
        })
      })
    }
  }


  getElapsedTimeText(exp: IExperience): string {
    return this.getElapsedTime(exp.startDate, exp.endDate);
  }

  getElapsedTime(startDate: string | undefined, endDate: string | undefined): string {
    return this.customDatePipe.transformTimeElapsed(startDate || null, endDate || null);
  }

  editExperience(exp: IExperience) {
    this.form.patchValue({
      role: exp.role,
      company: exp.company,
      startDate: exp.startDate,
      area: exp.area,
      description: exp.description,
      endDate: exp.endDate
    })
    this.expId = exp._id
  }

  deleteExperience(exp: IExperience) {
    if (confirm("Sei sicuro di voler eliminare questa esperienza?")) {
      this.svc.deleteExp(this.id, exp._id).pipe(
        switchMap(() => this.svc.getExp(this.id))
      ).subscribe(exps => {
        this.experiences = exps
        console.log(this.experiences)
      })
    }
  }

}
