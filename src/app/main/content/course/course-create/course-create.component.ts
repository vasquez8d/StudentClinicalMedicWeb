import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
    selector: 'fuse-course-create',
    templateUrl: './course-create.component.html',
    styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {
    form: FormGroup;
    formErrors: any;

    myControl: FormControl = new FormControl();
    options = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    horizontalStepperStep1Errors: any;
    horizontalStepperStep2Errors: any;
    horizontalStepperStep3Errors: any;
    
    fileToUpload: File = null;

    constructor(private formBuilder: FormBuilder) {
        // Reactive form errors
        this.formErrors = {
            cor_name: {},
            cor_price: {},
            cat_cor_id: {},
            user_doc_id: {},
            
            cor_des: {},
            cor_intro: {},

            cor_video: {}
        };

        // Horizontal Stepper form error
        this.horizontalStepperStep1Errors = {
            cor_name: {},
            cor_price: {},
            cat_cor_id: {},
            user_doc_id: {}
        };

        this.horizontalStepperStep2Errors = {
            cor_des: {},
            cor_intro: {}
        };

        this.horizontalStepperStep3Errors = {
            cor_video: {}
        };

    }

    ngOnInit() {
        // Reactive Form
        this.form = this.formBuilder.group({
            cor_name: ['', Validators.required],
            cor_price: ['', Validators.required],
            cat_cor_id: ['', Validators.required],
            user_doc_id: ['', Validators.required],

            cor_des: ['', Validators.required],
            cor_intro: ['', Validators.required],
            cor_img: [''],

            cor_video: ['', Validators.required]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this.formBuilder.group({
            cor_name: ['', Validators.required],
            cor_price: ['', Validators.required],
            cat_cor_id: ['', Validators.required],
            user_doc_id: ['', Validators.required],
        });

        this.horizontalStepperStep2 = this.formBuilder.group({
            cor_des: ['', Validators.required],
            cor_intro: ['', Validators.required],
            cor_img: [''],
        });

        this.horizontalStepperStep3 = this.formBuilder.group({
            cor_video: ['', Validators.required]
            // postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        });

        this.horizontalStepperStep1.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.horizontalStepperStep2.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.horizontalStepperStep3.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(val => this.filter(val))
        );
    }
    
    filter(val: string): string[] {
        return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    finishHorizontalStepper() {
        alert('You have finished the horizontal stepper!');
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        (<HTMLInputElement>document.getElementById('txtFileName')).value = this.fileToUpload.name;
        this.onFormValuesChanged();
    }
}
