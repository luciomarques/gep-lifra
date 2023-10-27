import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { EnvironmentInjector } from '@ionic/angular/di/r3_injector';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router, private http: HTTP
  ) { }

  // Get user session
  async getSession() {

    // ...
    // put auth session here
    // ...

    // Sample only - remove this after real authentication / session
    let session = {
      email: 'john.doe@mail.com'
    }

    return false;
    // return session;
  }

  // Sign in
  signIn(email: string, password: string): Observable<any> {

    const h = {
      // 'Content-Type': 'application/json',
    };

    // Sample only - remove this after real authentication / session
    let sample_user = {
      email: email,
      password: password
    }

    this.http.setDataSerializer('json');

    let url = `${environment.urlAPI}login/${email}/${password}`;

    // console.log(url);

    return from(this.http.get(url, null, h)
      .then((d) => {
        // console.log(d);
        return d;
      })
      .catch((ex) => {
        // console.log(ex);
        return ex;
      }));

    // return sample_user;
  }

  // Sign up
  signUp(email: string, password: string, name: string): Observable<any> {

    // Sample only - remove this after real authentication / session
    let sample_user = {
      email: email,
      password: password
    }

    const h = {
      //'Content-Type': 'application/json',
    };

    this.http.setDataSerializer('json');

    let url = `https://www.gepbusiness.com/GEPJSON/ServerGepJson.dll/datasnap/rest/TSMJsonGep/Cria_user/demo.financ1.user@gepbusiness.com/2295/${email}/42/${name}/${password}/pt/BRL/137/5000`;

    // console.log(url);

    return from(this.http.get(url, null, h)
      .then((d) => {
        // console.log(d);
        return d;
      })
      .catch((ex) => {
        // console.log(ex);
        return ex;
      }));

    // return sample_user;
  }

  // Sign out
  async signOut() {

    // ...
    // clean subscriptions / local storage etc. here
    // ...

    // Navigate to sign-in
    this.router.navigateByUrl('/signin');
  }
}
