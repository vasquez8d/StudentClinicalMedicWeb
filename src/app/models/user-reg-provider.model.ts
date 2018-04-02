import { Injectable } from '@angular/core';

@Injectable()
export class UserRegProviderModel {
    user: any = {
        email: '',
        id: '',
        image: '',
        name: '',
        provider: '',
        token: ''
    };
}
