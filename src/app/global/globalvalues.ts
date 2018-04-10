import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        // return 'https://studentav.herokuapp.com/user';
        return 'http://localhost:1337/user';
    }

    urlValidateMail(){
        return 'http://localhost:1337/emailauth';
        // return 'https://studentav.herokuapp.com/emailauth';
    }

    cryptoKey(){
        return 'avasquez';
    }
}
