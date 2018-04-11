import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserModel } from '../../../../../../models/user.model';
import { UserService } from '../../../../../../services/user.service';

@Component({
    selector: 'fuse-user-list-details',
    templateUrl: 'user-list-details.component.html'
})
export class UserListDetailsComponent {

    formPersonal: FormGroup;
    formAcademy: FormGroup;
    selected: any;
    formErrors: any;

    constructor(
        public dialogRef: MatDialogRef<UserListDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private userModel: UserModel,
        private userService: UserService
    ) {
        console.log(data);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
