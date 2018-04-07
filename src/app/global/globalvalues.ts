import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        return 'https://studentav.herokuapp.com/user';
    }

    urlValidateMail(){
        return 'http://localhost:1337/emailauth';
    }

    cryptoKey(){
        return 'avasquez';
    }
}
