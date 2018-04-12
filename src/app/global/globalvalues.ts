import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        return 'https://studentav.herokuapp.com/user';
        // return 'http://localhost:1337/user';
    }

    urlAuthUserAcademy() {
        return 'https://studentav.herokuapp.com/useracademy';
        // return 'http://localhost:1337/useracademy';
    }

    urlValidateMail(){
        return 'https://studentav.herokuapp.com/emailauth';
        // return 'http://localhost:1337/emailauth';
    }

    cryptoKey(){
        return 'avasquez';
    }
}
