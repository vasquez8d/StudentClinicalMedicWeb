import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal from 'sweetalert2';
import { MomentModule } from 'angular2-moment';
import { MatService } from '../../../../../services/mat.service';
import { GlobalValues } from '../../../../../global/globalvalues';

@Component({
    selector: 'fuse-payment-list-details',
    templateUrl: 'payment-list-dialog.component.html',
    styleUrls: ['./payment-list-dialog.component.scss']
})
export class PaymentListDetailsComponent implements OnInit {

    formPersonal: FormGroup;
    formErrors: any;
    fec_registro: any = '';
    mat_id: any;
    payment: any;
    mat_state: any = '';
    serverUrl: any = '';
    mat_voucher_img: any = '';
    
    constructor(
        public dialogRef: MatDialogRef<PaymentListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matService: MatService,
        private momentModule: MomentModule,
        private globalValues: GlobalValues
    ) {
        this.mat_id = data.mat_id;
        this.serverUrl = this.globalValues.urlServerImages();
    }

    ngOnInit() {
        this.formPersonal = this.formBuilder.group({
            usu_full_name: [''],
            cor_name: [''],
            cor_price: [''],
            cat_cor_name: [''],
            mat_voucher_img: [''],
            mat_state: [''],
            fec_registro: [''],
        });
        this.loadPaymentDetials();
    }

    aprobePayment(){
        Swal({
            title: '¿Estas seguro de aprobar al pago?',
            text: 'El alumno tendrá acceso al curso.',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.matService.getApprobe(this.mat_id).subscribe(
                    success => {
                        Swal({
                            title: 'Pago aprobado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.mat_state = 'Aprobado';
                    }, err => {
                        Swal({
                            title: 'Error Pago aprobado',
                            type: 'info',
                            text: err,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                    }
                );
            }
        });
    }

    disaprobePayment(){
        Swal({
            title: '¿Estas seguro de desaprobar el pago?',
            text: 'El alumno no tendrá acceso al curso.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.matService.getDisapprobe(this.mat_id).subscribe(
                    success => {
                        Swal({
                            title: 'Pago desaprobado',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                        this.mat_state = 'Desaprobado';
                    }, err => {
                        Swal({
                            title: 'Error Pago desaprobado',
                            type: 'info',
                            text: err,
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar',
                        });
                    }
                );
            }
        });
    }

    loadPaymentDetials() {
        this.matService.getMatDetails(this.mat_id).subscribe(
            success => {
                if (success.data_result.length > 0 ){

                    this.payment = success.data_result[0];
                    this.fec_registro = this.payment.fec_registro;
                    this.mat_voucher_img = this.payment.mat_voucher_img;

                    if (this.payment.mat_state === 1){
                        this.mat_state = 'Aprobado';
                    } else if (this.payment.mat_state === 2)
                    {
                        this.mat_state = 'Desaprobado';
                    } else 
                    {
                        this.mat_state = 'Por aprobar';
                    }
                    
                    this.formPersonal = this.formBuilder.group({
                        usu_full_name: [this.payment.usu_full_name],
                        cor_name: [this.payment.cor_name],
                        cor_price: [this.payment.cor_price],
                        cat_cor_name: [this.payment.cat_cor_name],
                        mat_voucher_img: [this.payment.mat_voucher_img],
                        mat_state: [this.mat_state],
                        fec_registro: [this.fec_registro],
                    });
                }
            },
            error => {
                console.log('error_loadPaymentDetials', error);
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
