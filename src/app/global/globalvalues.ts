import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        // return 'https://studentav.herokuapp.com/user';
        return 'http://localhost:1337/user';
    }

    urlAuthUserAcademy() {
        // return 'https://studentav.herokuapp.com/useracademy';
        return 'http://localhost:1337/useracademy';
    }

    urlValidateMail(){
        // return 'https://studentav.herokuapp.com/emailauth';
        return 'http://localhost:1337/emailauth';
    }

    urlCourse(){
        // return 'https://studentav.herokuapp.com/course';
        return 'http://localhost:1337/course';
    }

    urlCorcategory(){
        // return 'https://studentav.herokuapp.com/corcategory';
        return 'http://localhost:1337/corcategory';
    }

    urlServerImages(){
        // return 'https://studentav.herokuapp.com
        return 'http://localhost:1337';
    }

    cryptoKey(){
        return 'avasquez';
    }
}
