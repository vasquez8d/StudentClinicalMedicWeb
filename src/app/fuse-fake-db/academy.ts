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
            'title'  : 'Introducción 123',
            'content': '<h1>Introducción 123</h1>' +
            '<br>' +
            'Introducción del curso 1234.' +
            '<br><br>' +
            '<iframe src="https://player.vimeo.com/video/263371510" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
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
        }
    ];

    private static demoSteps4 = [
        {
            'title': 'Primera Pregunta',
            'content': '<h1>Primera Pregunta</h1>' +
                '<br>' +
                'Resuelve la pregunta.' +
                '<br><br>'
        },
        {
            'title': 'Segunda Pregunta',
            'content': '<h1>Segunda Pregunta</h1>' +
                '<br>' +
                'Resuelve la pregunta.' +
                '<br><br>'
        },
        {
            'title': 'Tercera Pregunta',
            'content': '<h1>Tercera Pregunta</h1>' +
                '<br>' +
                'Resuelve la pregunta.' +
                '<br><br>'
        },
        {
            'title': 'Cuarta Pregunta',
            'content': '<h1>Cuarta Pregunta</h1>' +
                '<br>' +
                'Resuelve la pregunta.' +
                '<br><br>'
        }
    ];

    public static course = [
        {
            'id': '15459251a6d6b397522',
            'title': 'Examen',
            'length': 180,
            'totalSteps': 4,
            'steps': AcademyFakeDb.demoSteps4
        },
        {
            'id'         : '15459251a6d6b397565',
            'title'      : 'Introducción a la Biofísica',
            'slug'       : 'introduccion-biofisica',
            'description': 'Curso Virtual de Biofísica',
            'category'   : 'Biofísica',
            'length'     : 180,
            'totalSteps' : 3,
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
            'totalSteps' : 3,
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
            'totalSteps' : 3,
            'updated'    : '26 de Mayo del 2018',
            'steps'      : AcademyFakeDb.demoSteps3
        }
    ];

}
