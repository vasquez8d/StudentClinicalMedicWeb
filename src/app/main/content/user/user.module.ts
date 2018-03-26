import { NgModule } from '@angular/core';
import { ProfileModule } from './profile/profile.module';
import { UserModel } from '../../../models/user.model';

@NgModule({
    imports: [
        ProfileModule
    ],
    providers: [
        UserModel
    ]
})
export class UserModule
{
    
}
