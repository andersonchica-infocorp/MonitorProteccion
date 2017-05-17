import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/pluck';
import { ApplicationService } from '../../../services/application.service';
import { Service } from '../../../Model/service.model';

import { ApplicationComponentService } from '../../shared/application.component.service';

import { Application } from '../../../Model/application.model';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {

  id: number = null;
  initialdata: Application;
  serviceName: string = null;

  form: FormGroup;

  pleaseSave: boolean = false;

  constructor(private route: ActivatedRoute, public fb: FormBuilder,
    public router: Router, private applicationService: ApplicationService,
    public applicationComponentService: ApplicationComponentService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(150)]],
      serviceName: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.initialdata = this.applicationComponentService.applicationSelected$;
      console.log(this.initialdata);
    });
  }

  doCancel() {
    this.router.navigate(['/master/application']);
  }

  doReset() {
    this.createForm(this.initialdata);
    this.pleaseSave = false;
  }

  private createForm(data: Application) {

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(150)]],
      serviceName: ''
    });
    this.initialdata = data;
    /*this.nameCtrl = new FormControl(data ? data.name : '', Validators.required);
    this.reallyThirstyCtrl = new FormControl(data ? data.reallyThirsty : null, Validators.required);
    this.preferredDrinkCtrl = new FormControl(data ? data.preferredDrink : 'water');
    this.form = this.fb.group({
      name: this.nameCtrl,
      reallyThirsty: this.reallyThirstyCtrl,
      preferredDrink: this.preferredDrinkCtrl
    });*/
  }

  private updateForm(data: Application) {
    this.initialdata = data;
    /*this.nameCtrl.setValue(data ? data.name : '');
    this.reallyThirstyCtrl.setValue(data ? data.reallyThirsty : null, Validators.required);
    this.preferredDrinkCtrl.setValue(data ? data.preferredDrink : 'water');*/
  }

  addService(serviceName: string) {
    //this.initialdata.services.push(new Service(0, serviceName));
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
