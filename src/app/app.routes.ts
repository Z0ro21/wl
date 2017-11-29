import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './components/login/login.component'
import { InsideComponent} from './components/inside/inside.component'
import { ProfileComponent} from './components/inside/profile/profile.component'
import { MainComponent} from './components/inside/main/main.component'
import { TestComponent} from './components/inside/test/test.component'
import { LikesComponent} from './components/inside/test/likes/likes.component'
import { VisionComponent} from './components/inside/test/vision/vision.component'
import { PersonalityComponent} from './components/inside/test/personality/personality.component'

const app_routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: InsideComponent, children:[
        { path: 'inicio', component: MainComponent},
        { path: 'perfil', component: ProfileComponent},
        { path: 'test', component: TestComponent, children:[
          { path: 'gustos', component: LikesComponent},
          { path: 'vision', component: VisionComponent},
          { path: 'personalidad', component: PersonalityComponent},
          { path: '**', pathMatch: 'full', redirectTo: 'gustos'}
        ]},
        { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
  ]},
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
