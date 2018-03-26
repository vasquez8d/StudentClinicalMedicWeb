import { Injectable } from '@angular/core';

@Injectable()
export class UserModel {
    user: any = {
        user_id: '0',
        user_mail: '',
        user_pw: '',
        user_pri_nom: '',
        user_seg_nom: '',
        user_ape_pat: '',
        user_ape_mat: '',
        user_fec_nac: '',
        user_ubigeo: '',
        user_num_cell: '',
        user_num_fijo: '',
        user_ult_con: '',
        user_desc: '',
        rol_id: '',
        est_registro: '',
        fec_registro: '',
        usu_registro: ''
    };
}
