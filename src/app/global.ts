export const Global = {
    // api_url: 'https://localhost:7158/api/',
    api_url: 'https://matriculasback20240810025243.azurewebsites.net/api/',

    // endpoints
    // CURSOS
    API_GET_CURSOS: 'cursos',
    API_GET_CURSO_BY_ID: 'curso/',
    API_GET_CURSOS_BY_DOCENTE_ID: 'cursos/docente/',
    API_SAVE_CURSO: 'curso/registrar',
    API_DELETE_CURSO: 'curso/inactivar/',
    API_UPDATE_CURSO: 'curso/actualizar/',

    // MATRICULAS
    API_GET_MATRICULAS: 'matricula/todos',
    API_SAVE_MATRICULA_DOCENTE: 'matricula/docente',
    API_SAVE_MATRICULA_ESTUDIANTE: 'matricula/estudiante',

    // CALIFICACIONES
    API_SAVE_CALIFICACION: 'calificacion',
    API_GET_CALIFICACIONES_BY_CURSO_ESTUDIANTE: 'calificacion/{idUser}/{idCurso}/',
    API_PROCESAR_CALIFICACION_BY_MATRICULA: 'calificacion/procesar/{idMatricula}',
    API_VALIDAR_PROCESAR_CALIFICACION: 'calificacion/activar/procesar/{idMatricula}',

    // USUARIOS
    API_GET_USUARIOS: 'usuario/todos',
    API_GET_ESTUDIANTES: 'estudiantes',
    API_SAVE_ESTUDIANTE: 'estudiante/registrar',
    API_GET_ESTUDIANTE_BY_CURSO_ID: 'estudiante/curso/',
    API_SAVE_USUARIO: 'usuario/registrar',
    API_GET_DOCENTES: 'docentes',
    API_SAVE_DOCENTE: 'docente/registrar',
    API_UPDATE_USUARIO: 'usuario/actualizar/',
    API_DELETE_USUARIO: 'usuario/inactivar/',
    
    // PARAMETROS
    API_GEL_ALL_PARAMETERS: 'parameter/todos',
    API_GET_PARAMETER_BY_ID: 'parameter/',
    API_GET_CALIFICACION_DROPDOWNS_BY_STUDENT_AND_COURSE: 'calificacion/dropdowns/{idStudent}/{idCourse}',

    // MENU PRINCIPAL
    MENU: [
        // {
        //     path:'dashboard',
        //     icon: 'pi pi-desktop',
        //     name: 'Dashboard',
        //     active: false,
        //     roles: ['ADM', 'SEC', 'EST', 'DOC']
        // },
        {
            path: 'matriculas',
            icon: 'pi pi-id-card',
            name: 'Matriculas',
            active: false,
            roles: ['ADM', 'SEC']
        },
        {
            path:'cursos',
            icon: 'pi pi-book',
            name: 'Cursos',
            active: false,
            roles: ['ADM', 'SEC', 'DOC', 'EST']
        },
        {
            path: 'usuarios',
            icon: 'pi pi-users',
            name: 'Usuarios',
            active: false,
            roles: ['ADM']
        },
        {
            path: 'estudiantes',
            icon: 'pi pi-user-edit',
            name: 'Estudiantes',
            active: false,
            roles: ['SEC']
        },
        {
            path: 'docentes',
            icon: 'pi pi-briefcase',
            name: 'Docentes',
            active: false,
            roles: ['SEC']
        },
        {
            path: 'calificaciones',
            icon: 'pi pi-chart-line',
            name: 'Calificaciones',
            active: false,
            roles: ['DOC', 'EST']
        },
        {
            path: 'parametros',
            icon: 'pi pi-cog',
            name: 'Parámetros',
            active: false,
            roles: ['ADM']
        }              
    ]
}