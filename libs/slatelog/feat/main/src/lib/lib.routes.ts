import {Route} from '@angular/router';
import { MainShellComponent } from './main-shell.component';
import { TimelineContainerComponent } from '../../../../timeline/src';




export const featureMainRoutes: Route[] = [

  { path: '', component: MainShellComponent, children: [

      {path: 'timeline', component: TimelineContainerComponent},

      {path:'**', redirectTo: 'timeline'}
    ]},
];
