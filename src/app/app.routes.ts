import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './components/main/main.component';
import { LoginGuard } from './guards/login.guard';
import { CursosComponent } from './components/main/cursos/cursos.component';
import { MatriculaComponent } from './components/main/matricula/matricula.component';
import { DocenteComponent } from './components/main/docente/docente.component';
import { EstudianteComponent } from './components/main/estudiante/estudiante.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
    {
        path: 'home', component: MainComponent, canActivate: [AuthGuard],
        children: [
            {
                path:'cursos',
                component: CursosComponent
            },
            {
                path: 'matriculas',
                component: MatriculaComponent
            },
            {
                path: 'docentes',
                component: DocenteComponent
            },
            {
                path: 'estudiantes',
                component: EstudianteComponent
            }
        ]
    }
];
