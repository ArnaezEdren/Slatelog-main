import {Route} from '@angular/router';
import { TimelineContainerComponent } from '../../../../timeline/src';
import { MainShellComponent } from './main-shell.component';




export const featureMainRoutes: Route[] = [

  { path: '', component: MainShellComponent, children: [

      {path: 'timeline', component: TimelineContainerComponent},

      {path:'**', redirectTo: 'timeline'}
    ]},
];
