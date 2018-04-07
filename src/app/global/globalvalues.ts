import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        return 'https://studentav.herokuapp.com/user';
    }

    urlValidateMail(){
        return 'https://studentav.herokuapp.com/emailauth';
    }

    cryptoKey(){
        return 'avasquez';
    }
}
