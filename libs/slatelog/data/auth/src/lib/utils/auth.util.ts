// (username,password) -> 'Basic base64(username:password)'
// btoa('rene@gmx.at:123456') -> "cmVuZUBnbXguYXQ6MTIzNDU2"
import { HttpHeaders } from '@angular/common/http';
import { AUTH_HEADER, AuthToken } from '../model/auth.model';


export function generateAuthToken(username: string, password: string): AuthToken {
  return `Basic ${btoa(username + ':' + password)}`;
  // return 'Basic ' + btoa(username + ':' + password);
}

export function appendAuthHeader(headers: HttpHeaders, authToken: AuthToken): HttpHeaders {
  return headers.set(AUTH_HEADER, authToken);
}
