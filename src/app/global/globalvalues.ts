import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValues {
    urlAuthUser() {
        return 'http://localhost:1337/user';
    }
    cryptoKey(){
        return 'avasquez';
    }
}
