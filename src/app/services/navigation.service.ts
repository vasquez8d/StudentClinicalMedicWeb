import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
// import * as crypto from 'crypto-js';

import { Base64 } from 'js-base64';
import { GlobalUser } from '../global/globaluser';
import { GlobalValues } from '../global/globalvalues';

@Injectable()
export class NavigationService {
  constructor( 
      private globalUser: GlobalUser,
      private globalValues: GlobalValues
   ) { }

  getNavigation(user){     
    //   const pwEncrypt = crypto.AES.encrypt(, this.globalValues.cryptoKey());
    //   const encryptUser = pwEncrypt.toString().replace('/', '_');

      const encryptUser = Base64.encode(user.user_id.toString());
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
                //   {
                //       'id': 'chat',
                //       'title': 'Chat',
                //       'translate': 'NAV.CONVERSATIONS',
                //       'type': 'item',
                //       'icon': 'chat',
                //       'url': '/app/chat',
                //   }
              ]
          },
          {
              'id': 'user',
              'title': 'Usuario',
              'translate': 'NAV.USER',
              'type': 'group',
              'children': [
                  {
                      'id': 'perfil',
                      'title': 'Perfil',
                      'translate': 'NAV.PROFILE',
                      'type': 'item',
                      'icon': 'person',
                      'url': '/user/' + encryptUser + '/profile',
                  },
                  {
                      'id': 'exam',
                      'title': 'Exámenes',
                      'translate': 'NAV.EXAM',
                      'type': 'item',
                      'icon': 'playlist_add_check',
                      'url': '/exam/',
                  },
                  {
                    'id': 'my_course',
                    'title': 'Mis Cursos',
                    'translate': 'NAV.COURSES',
                    'type': 'item',
                    'icon': 'school',
                    'url': '/course/' + encryptUser + '/info',
                },
              ]
          },
      ];
      
      switch (user.rol_id){
        case 1: // ADMIN
              DefaultNavigation.push({
                  'id': 'admin',
                  'title': 'Administrador',
                  'translate': 'NAV.ADMIN',
                  'type': 'group',
                  'children': [
                      {
                          'id': 'courses',
                          'title': 'Cursos',
                          'type': 'collapse',
                          'icon': 'school',
                          'children': [
                              {
                                  'id': 'list_course',
                                  'title': 'Listado',
                                  'type': 'item',
                                  'icon': 'view_headline',
                                  'url': '/course/list'
                              },
                              {
                                  'id': 'new_course',
                                  'title': 'Nuevo',
                                  'type': 'item',
                                  'icon': 'control_point',
                                  'url': '/course/create'
                              },
                          ]
                      },
                      {
                          'id': 'category',
                          'title': 'Categorías',
                          'type': 'collapse',
                          'icon': 'layers',
                          'children': [
                              {
                                  'id': 'list',
                                  'title': 'Listado',
                                  'type': 'item',
                                  'icon': 'view_headline',
                                  'url': '/category/list'
                              }
                          ]
                      },
                      {
                          'id': 'Usuarios',
                          'title': 'Usuarios',
                          'type': 'collapse',
                          'icon': 'people',
                          'children': [
                              {
                                  'id': 'list',
                                  'title': 'Listado',
                                  'type': 'item',
                                  'icon': 'view_headline',
                                  'url': '/user/list'
                              }
                          ]
                      }
                  ]
              });
              break;
        case 4: // DOCENTE
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
