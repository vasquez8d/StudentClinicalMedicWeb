import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {

    private ServerUrl = 'https://studentav-dev.herokuapp.com';
    // private ServerUrl = 'http://localhost:1400';

    urlAuthUser() {
        return this.ServerUrl + '/user';
    }

    urlAuthUserAcademy() {
        return this.ServerUrl + '/useracademy';
    }

    urlValidateMail(){
        return this.ServerUrl + '/emailauth';
    }

    urlCourse(){
        return this.ServerUrl + '/course';
    }

    urlCorcategory(){
        return this.ServerUrl + '/corcategory';
    }

    urlClass(){
        return this.ServerUrl + '/class';
    }

    urlMat(){
        return this.ServerUrl + '/mat';
    }

    urlQuestions(){
        return this.ServerUrl + '/questions';
    }

    urlComments(){
        return this.ServerUrl + '/comment';
    }

    urlTest(){
        return this.ServerUrl + '/test';
    }

    urlServerImages(){
        return this.ServerUrl;
    }

    cryptoKey(){
        return 'avasquez';
    }
}
