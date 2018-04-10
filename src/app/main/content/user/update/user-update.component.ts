import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Base64 } from 'js-base64';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';

@Component({
    selector   : 'fuse-user-update-forms',
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
        private activatedRoute: ActivatedRoute,
        private userService: UserService)
    {
        // Reactive form errors
        this.formErrors = {
            user_dni       : {},
            user_fec_nac   : {},
            user_dpt       : {},
            user_prv       : {},
            user_dst       : {},
            user_dir       : {},
            user_tim_aca   : {},
            user_est_civil : {}
        };
    }

    ngOnInit()
    {
        // Reactive Form
        this.formPersonal = this.formBuilder.group({
            user_pri_nom   : ['Alex'],
            user_ape_pat   : ['Vasquez'],
            user_ape_mat   : [''],
            user_mail      : ['vasquez8d@gmail.com'],
            user_dni       : ['', Validators.required],
            user_fec_nac   : ['', Validators.required],
            user_dpt       : ['', Validators.required],
            user_prv       : ['', Validators.required],
            user_dst       : ['', Validators.required],
            user_dir       : ['', Validators.required],
            user_tim_aca   : ['', Validators.required],
            user_est_civil : ['', Validators.required],
            user_flg_hijos : [''],
            user_flg_vsolo : [''],
            user_flg_inter : [''],
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
        this.activatedRoute.params.subscribe( params => {
            if ( params.user_id ){
              const user_id = Base64.decode(params.user_id);
              const encryptUser = Base64.encode(user_id.toString());
              this.router.navigate(['user/' + encryptUser + '/profile']);
            }
          });
    }

    saveUserInformation(){

        this.activatedRoute.params.subscribe(params => {
            if (params.user_id) {

                const user_id = Base64.decode(params.user_id);
                const encryptUser = Base64.encode(user_id.toString());

                const dataRegisterPersonal = this.formPersonal.value;
                const dataRegisterAcademy = this.formAcademy.value;

                const userUpdate = {
                    user_id: user_id,
                    personalInfo: dataRegisterPersonal,
                    academyInfo: dataRegisterAcademy
                };

                this.userService.postUpdateUserInfo(userUpdate).subscribe(
                    success => {
                        Swal({
                            title: 'Actualizar información',
                            text: 'Se registró correctamente la información.',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        }).then((resultAcept) => {
                            console.log(userUpdate);
                            this.router.navigate(['user/' + encryptUser + '/profile']);
                        });
                    }, err => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
