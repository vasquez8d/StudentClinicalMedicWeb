export class AcademyFakeDb
{
    public static courses = [
        {
            'id'      : '15459251a6d6b397565',
            'title'   : 'Introducción a la Biofísica',
            'slug'    : 'introduccion-biofisica',
            'category': 'biofisica',
            'length'  : 180,
            'updated' : '4 de Enero del 2018'
        },
        {
            'id'      : '154588a0864d2881124',
            'title'   : 'Biofísica II',
            'slug'    : 'biofisica-ii',
            'category': 'biofisica',
            'length'  : 220,
            'updated' : '22 de Febrero del 2018'
        },
        {
            'id'      : '15453ba60d3baa5daaf',
            'title'   : 'Introducción a la Farmacología',
            'slug'    : 'introduccion-farmacologia',
            'category': 'farmacologia',
            'length'  : 185,
            'updated' : '26 de Mayo del 2018'
        }
    ];

    public static categories = [
        {
            'id'   : 0,
            'value': 'biofisica',
            'label': 'Biofísica'
        },
        {
            'id'   : 1,
            'value': 'farmacologia',
            'label': 'Farmacología'
        }
    ];

    private static demoSteps1 = [
        {
            'title'  : 'Introducción',
            'content': '<h1>Introducción</h1>' +
            '<br>' +
            'Introducción del curso.' +
            '<br><br>'
        },
        {
            'title'  : 'Primera Clase',
            'content': '<h1>Primera Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Segunda Clase',
            'content': '<h1>Segunda Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Tercera Clase',
            'content': '<h1>Tercera Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Cuarta Clase',
            'content': '<h1>Cuarta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Quinta Clase',
            'content': '<h1>Quinta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Sexta Clase',
            'content': '<h1>Sexta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Clase Final',
            'content': '<h1>Clase Final - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase final, fecilitaciones y video.'
        }
    ];

    private static demoSteps2 = [
        {
            'title'  : 'Introducción',
            'content': '<h1>Introducción</h1>' +
            '<br>' +
            'Introducción del curso.' +
            '<br><br>'
        },
        {
            'title'  : 'Primera Clase',
            'content': '<h1>Primera Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Segunda Clase',
            'content': '<h1>Segunda Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Tercera Clase',
            'content': '<h1>Tercera Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Cuarta Clase',
            'content': '<h1>Cuarta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Quinta Clase',
            'content': '<h1>Quinta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Sexta Clase',
            'content': '<h1>Sexta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Septima Clase',
            'content': '<h1>Step 9 - Images moderation</h1>' +
            '<br>' +
            'This is an example step of the course. You can put anything in here from example codes to videos.' +
            '<br><br>' +
            'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
            'To install or upgrade the CLI run the following <b>npm</b> command:' +
            '<br><br>' +
            '<code>npm -g install @angular/cli</code>' +
            '<br><br>' +
            'To verify that the CLI has been installed correctly, open a console and run:' +
            '<br><br>' +
            '<code>ng version</code>' +
            '<br><br>' +
            '<h2>Install dependencies</h2>' +
            '<br>' +
            'To moderate the images we\'ll need a few Node.js packages:' +
            '<br><br>' +
            '<ul>' +
            '<li>' +
            'The Google Cloud Vision Client Library for Node.js: @google-cloud/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'The Google Cloud Storage Client Library for Node.js: @google-cloud/storage to download and upload the images from Cloud Storage.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
            '</li>' +
            '</ul>' +
            '<br>' +
            'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
            '<br><br>' +
            '<code>npm install --save @google-cloud/vision @google-cloud/storage child-process-promise</code>' +
            '<br><br>' +
            'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title'  : 'Octava Clase',
            'content': '<h1>Step 10 - New Message Notifications</h1>' +
            '<br>' +
            'This is an example step of the course. You can put anything in here from example codes to videos.' +
            '<br><br>' +
            'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
            'To install or upgrade the CLI run the following <b>npm</b> command:' +
            '<br><br>' +
            '<code>npm -g install @angular/cli</code>' +
            '<br><br>' +
            'To verify that the CLI has been installed correctly, open a console and run:' +
            '<br><br>' +
            '<code>ng version</code>' +
            '<br><br>' +
            '<h2>Install dependencies</h2>' +
            '<br>' +
            'To moderate the images we\'ll need a few Node.js packages:' +
            '<br><br>' +
            '<ul>' +
            '<li>' +
            'The Google Cloud Vision Client Library for Node.js: @google-cloud/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'The Google Cloud Storage Client Library for Node.js: @google-cloud/storage to download and upload the images from Cloud Storage.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
            '</li>' +
            '</ul>' +
            '<br>' +
            'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
            '<br><br>' +
            '<code>npm install --save @google-cloud/vision @google-cloud/storage child-process-promise</code>' +
            '<br><br>' +
            'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title'  : 'Octava Clase',
            'content': '<h1>Step 10 - New Message Notifications</h1>' +
            '<br>' +
            'This is an example step of the course. You can put anything in here from example codes to videos.' +
            '<br><br>' +
            'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
            'To install or upgrade the CLI run the following <b>npm</b> command:' +
            '<br><br>' +
            '<code>npm -g install @angular/cli</code>' +
            '<br><br>' +
            'To verify that the CLI has been installed correctly, open a console and run:' +
            '<br><br>' +
            '<code>ng version</code>' +
            '<br><br>' +
            '<h2>Install dependencies</h2>' +
            '<br>' +
            'To moderate the images we\'ll need a few Node.js packages:' +
            '<br><br>' +
            '<ul>' +
            '<li>' +
            'The Google Cloud Vision Client Library for Node.js: @google-cloud/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'The Google Cloud Storage Client Library for Node.js: @google-cloud/storage to download and upload the images from Cloud Storage.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
            '</li>' +
            '</ul>' +
            '<br>' +
            'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
            '<br><br>' +
            '<code>npm install --save @google-cloud/vision @google-cloud/storage child-process-promise</code>' +
            '<br><br>' +
            'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title'  : 'Clase Final',
            'content': '<h1>Step 11 - Congratulations!</h1>' +
            '<br>' +
            'You\'ve built a full-fidelity, offline-capable progressive web app by leveraging the power of reusable Web Components and Firebase. Why bother with a native app when you know how to do all that?!'
        }
    ];

    private static demoSteps3 = [
        {
            'title'  : 'Introducción',
            'content': '<h1>Introducción</h1>' +
            '<br>' +
            'Introducción del curso.' +
            '<br><br>'
        },
        {
            'title'  : 'Primera Clase',
            'content': '<h1>Primera Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Segunda Clase',
            'content': '<h1>Segunda Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Tercera Clase',
            'content': '<h1>Tercera Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Cuarta Clase',
            'content': '<h1>Cuarta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Quinta Clase',
            'content': '<h1>Quinta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Sexta Clase',
            'content': '<h1>Sexta Clase - Titulo</h1>' +
            '<br>' +
            'Descripción de la clase y video.' +
            '<br><br>'
        },
        {
            'title'  : 'Octava Clase',
            'content': '<h1>Step 8 - Welcome New Users</h1>' +
            '<br>' +
            'This is an example step of the course. You can put anything in here from example codes to videos.' +
            '<br><br>' +
            'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
            'To install or upgrade the CLI run the following <b>npm</b> command:' +
            '<br><br>' +
            '<code>npm -g install @angular/cli</code>' +
            '<br><br>' +
            'To verify that the CLI has been installed correctly, open a console and run:' +
            '<br><br>' +
            '<code>ng version</code>' +
            '<br><br>' +
            '<h2>Install dependencies</h2>' +
            '<br>' +
            'To moderate the images we\'ll need a few Node.js packages:' +
            '<br><br>' +
            '<ul>' +
            '<li>' +
            'The Google Cloud Vision Client Library for Node.js: @google-cloud/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'The Google Cloud Storage Client Library for Node.js: @google-cloud/storage to download and upload the images from Cloud Storage.' +
            '</li>' +
            '<br>' +
            '<li>' +
            'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
            '</li>' +
            '</ul>' +
            '<br>' +
            'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
            '<br><br>' +
            '<code>npm install --save @google-cloud/vision @google-cloud/storage child-process-promise</code>' +
            '<br><br>' +
            'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title'  : 'Clase Final',
            'content': '<h1>Step 11 - Congratulations!</h1>' +
            '<br>' +
            'You\'ve built a full-fidelity, offline-capable progressive web app by leveraging the power of reusable Web Components and Firebase. Why bother with a native app when you know how to do all that?!'
        }
    ];

    public static course = [
        {
            'id'         : '15459251a6d6b397565',
            'title'      : 'Introducción a la Biofísica',
            'slug'       : 'introduccion-biofisica',
            'description': 'Curso Virtual de Biofísica',
            'category'   : 'Biofísica',
            'length'     : 180,
            'totalSteps' : 8,
            'updated'    : '4 de Enero del 2018',
            'steps'      : AcademyFakeDb.demoSteps1
        },
        {
            'id'         : '154588a0864d2881124',
            'title'      : 'Biofísica II',
            'slug'       : 'biofisica-ii',
            'description': 'Curso Virtual de Biofísica',
            'category'   : 'Biofísica',
            'length'     : 220,
            'totalSteps' : 11,
            'updated'    : '22 de Febrero del 2018',
            'steps'      : AcademyFakeDb.demoSteps2
        },
        {
            'id'         : '15453ba60d3baa5daaf',
            'title'      : 'Introducción a la Farmacología',
            'slug'       : 'introduccion-farmacologia',
            'description': 'Curso Virtual de Farmacología',
            'category'   : 'Farmacología',
            'length'     : 185,
            'totalSteps' : 9,
            'updated'    : '26 de Mayo del 2018',
            'steps'      : AcademyFakeDb.demoSteps3
        }
    ];

}
