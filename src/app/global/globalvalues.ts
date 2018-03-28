import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        return 'https://studentav.herokuapp.com/user';
    }
    cryptoKey(){
        return 'avasquez';
    }
}
