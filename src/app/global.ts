export const Global = {
    api_url: 'https://localhost:7158/api/',

    getActualPath: () => {
        return window.location.pathname.split('/')[2];
    },

    // endpoints

    // CURSOS
    API_GET_CURSOS: 'cursos',
    API_SAVE_CURSO: 'curso/registrar',
    API_DELETE_CURSO: 'curso/inactivar/',
    API_UPDATE_CURSO: 'curso/actualizar',

    // MATRICULAS
    API_GET_MATRICULAS: 'matricula/todos',
    API_SAVE_MATRICULA_DOCENTE: 'matricula/docente',
    API_SAVE_MATRICULA_ESTUDIANTE: 'matricula/estudiante',
    
    // PARAMETROS
    API_GET_PARAMETER_BY_ID: 'parameter/',

    // MENU PRINCIPAL
    MENU: [
        // {
        //     path:'dashboard',
        //     icon: 'pi pi-desktop',
        //     name: 'Dashboard',
        //     roles: ['ADM', 'SEC']
        // },
        {
            path: 'matriculas',
            icon: 'pi pi-id-card',
            name: 'Matriculas',
            roles: ['ADM', 'SEC', 'DOC', 'EST']
        },
        {
            path:'cursos',
            icon: 'pi pi-book',
            name: 'Cursos',
            roles: ['ADM', 'SEC', 'DOC', 'EST']
        },
        {
            path: 'estudiantes',
            icon: 'pi pi-user',
            name: 'Estudiantes',
            roles: ['ADM', 'SEC', 'DOC', 'EST']
        },
        {
            path: 'docentes',
            icon: 'pi pi-users',
            name: 'Docentes',
            roles: ['ADM', 'SEC', 'DOC', 'EST']
        },
        {
            path: 'parametros',
            icon: 'pi pi-cog',
            name: 'Parametros',
            roles: ['ADM', 'SEC', 'DOC', 'EST']
        }
    ]
}