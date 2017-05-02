import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const routes : Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'chat-room',
                component: ChatRoomComponent
            }
        ]
    }
];

export const appRouting = RouterModule.forRoot(routes);
export const routedComponent = [DashboardComponent, IndexComponent, ChatRoomComponent];