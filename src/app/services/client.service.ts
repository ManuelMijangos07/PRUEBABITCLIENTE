import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Client} from '../models/client';
@Injectable()
export class ClientService
{

  public url: string;

  constructor(private _http: Http)
  {
    this.url=GLOBAL.url;
  }

  getClients(token, page)
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
      });
      let options = new RequestOptions({headers: headers});
      return this._http.get(this.url+'clients/'+page,options)
      .map(res=>res.json());
  }

  getClient(token, id: string)
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
      });
      let options = new RequestOptions({headers: headers});
      return this._http.get(this.url+'client/'+id,options)
      .map(res=>res.json());
  }

  editClient(token,id:string ,client: Client)
  {
    let params = JSON.stringify(client);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.put(this.url+'client/'+id,params,{headers: headers})
      .map(res => res.json());
  }

  addClient(token, client: Client)
  {
    let params = JSON.stringify(client);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.post(this.url+'client',params,{headers: headers})
      .map(res => res.json());
  }

  deleteClient(token, id: string)
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
      });
      let options = new RequestOptions({headers: headers});
      return this._http.delete(this.url+'client/'+id,options)
      .map(res=>res.json());
  }
}
