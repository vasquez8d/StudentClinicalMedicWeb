import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';

@Component({
    selector   : 'user-update-forms',
    templateUrl: './user-update.component.html',
    styleUrls  : ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit
{
    formPersonal: FormGroup;
    formAcademy: FormGroup;

    formErrors: any;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute)
    {
        // Reactive form errors
        this.formErrors = {
            dni    : {},
            fecNac : {},
            lugPrc : {},
            dirAct : {},
            timAca : {},
            estCiv : {}
        };
    }

    ngOnInit()
    {
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            firstName : ['Alex'],
            lastName  : ['Vasquez'],
            email     : ['vasquez8d@gmail.com'],
            dni       : ['', Validators.required],
            fecNac    : ['', Validators.required],
            lugPrc    : ['', Validators.required],
            dirAct    : ['', Validators.required],
            timAca    : ['', Validators.required],
            estCiv    : ['', Validators.required],
            hijos     : [''],
            vivSol    : [''],
            inter     : [''],
        });

        this.formPersonal.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formAcademy = this.formBuilder.group({
            priEsp : [''],
            segEsp : [''],
            priUni : [''],
            segUni : [''],
            uniPrc : [''],
            qtoSup : ['']
        });
    }

    onFormValuesChanged()
    {
        for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.formPersonal.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

    finishHorizontalStepper()
    {
        alert('You have finished the horizontal stepper!');
    }

    finishVerticalStepper()
    {
        alert('You have finished the vertical stepper!');
    }

    navigateProfile(){
        this.activatedRoute.params.subscribe( params =>{
            if( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              const encryptUser = Base64.encode(user_id.toString());
              this.router.navigate(['user/' + encryptUser + '/profile']);
            }
          })
    }

    saveUserInformation(){
        const dataRegisterPersonal = this.formPersonal.value;
        const dataRegisterAcademy = this.formAcademy.value;
        console.log(dataRegisterPersonal);
        console.log(dataRegisterAcademy);
    }
}
