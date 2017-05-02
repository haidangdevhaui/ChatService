import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import { AuthComponent } from "./auth.component";

const routes : Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'sign-in',
                component: SignInComponent
            }
        ]
    }
];

export const authRouting = RouterModule.forChild(routes);
export const routedComponents = [SignInComponent, AuthComponent];