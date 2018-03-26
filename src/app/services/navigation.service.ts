import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import * as crypto from 'crypto-js';
import { GlobalUser } from '../global/globaluser';
import { GlobalValues } from '../global/globalvalues';

@Injectable()
export class NavigationService {
  constructor( 
      private globalUser: GlobalUser,
      private globalValues: GlobalValues
   ) { }

  getNavigation(user){     
      const pwEncrypt = crypto.AES.encrypt(user.user_id.toString(), this.globalValues.cryptoKey());
      const encryptUser = pwEncrypt.toString().replace('/', '_');
      let DefaultNavigation: any;
      DefaultNavigation = [
          {
              'id': 'apps',
              'title': 'Apps',
              'translate': 'NAV.APPLICATIONS',
              'type': 'group',
              'children': [
                  {
                      'id': 'principal',
                      'title': 'Principal',
                      'translate': 'NAV.DASHBOARD',
                      'type': 'item',
                      'icon': 'dashboard',
                      'url': '/app/dashboard',
                  },
                  {
                      'id': 'chat',
                      'title': 'Chat',
                      'translate': 'NAV.CONVERSATIONS',
                      'type': 'item',
                      'icon': 'chat',
                      'url': '/app/chat',
                  }
              ]
          },
          {
              'id': 'perfil',
              'title': 'Perfil',
              'translate': 'NAV.PROFILE',
              'type': 'group',
              'children': [
                  {
                      'id': 'perfil',
                      'title': 'Perfil',
                      'translate': 'NAV.PROFILE',
                      'type': 'item',
                      'icon': 'person',
                      'url': '/user/' + encryptUser + '/profile',
                  }
              ]
          },
          {
              'id': 'user-interface',
              'title': 'User Interface',
              'type': 'group',
              'icon': 'web',
              'children': [
                  {
                      'id': 'forms',
                      'title': 'Forms',
                      'type': 'item',
                      'icon': 'web_asset',
                      'url': '/ui/forms'
                  }
              ]
          }
      ];
      
      switch (user.rol_id){
        case 1:
              DefaultNavigation.push({
                  'id': 'admin',
                  'title': 'Administrador',
                  'translate': 'NAV.ADMIN',
                  'type': 'group',
                  'children': [
                      {
                          'id': 'listar',
                          'title': 'Listado',
                          'type': 'item',
                          'icon': 'school',
                          'url': '/course/list'
                      },
                      {
                          'id': 'crear',
                          'title': 'Nuevo',
                          'type': 'item',
                          'icon': 'school',
                          'url': '/course/create'
                      },
                  ]
              });
              break;
        case 3:
              DefaultNavigation.push({
                  'id': 'profesor',
                  'title': 'Profesor',
                  'translate': 'NAV.TEACHER',
                  'type': 'group',
                  'children': [
                      {
                          'id': 'listar',
                          'title': 'Cursos',
                          'type': 'item',
                          'icon': 'school',
                          'url': '/course/list'
                      }
                  ]
              });
              break;
      }
      return DefaultNavigation;
  }
}
