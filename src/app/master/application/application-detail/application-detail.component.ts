import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/pluck';
import { ApplicationService } from '../../../services/application.service';
import { Service } from '../../../Model/service.model';


import { Application } from '../../../Model/application.model';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {

  id: number = null;
  initialdata: Application = null;
  serviceName: string = null;

  form: FormGroup;

  pleaseSave: boolean = false;

  constructor(private route: ActivatedRoute, public fb: FormBuilder,
    public router: Router, private applicationService: ApplicationService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(150)]],
      serviceName: ''
    });

    this.createForm(new Application(0, "", "", []));
  }

  ngOnInit() {
  	/*this.route.data.pluck<Application>('details')
      .subscribe(d => {
        this.pleaseSave = false;
        this.id = d ? d.id : null;
        if (this.form) {
          this.updateForm(d);
        } else {
          this.createForm(d);
        }
        //this.getfocus.focus();
      });*/
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
console.log(serviceName);
    this.initialdata.Services.push(new Service(0, serviceName));
  }
}
