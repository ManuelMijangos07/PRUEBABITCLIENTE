import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {ClientService} from '../services/client.service';
import {GLOBAL} from '../services/global';
import {Client} from '../models/client';

@Component({
  selector: 'client-list',
  templateUrl: '../views/client-list.html',
  providers:[UserService, ClientService]
})

export class ClientListComponent implements OnInit{
  public titulo: string;
  public clients: Client[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _clientService: ClientService

  ){
    this.titulo = 'Clientes';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.next_page=1;
    this.prev_page=1;
    }

    ngOnInit()
    {
      console.log('client-list.component.ts cargado');
      console.log(this.identity);

      this.getClients();
    }

    getClients()
    {
      this._route.params.forEach((params: Params)=>{
        let page = +params['page'];
        if(!page)
        {
          page = 1;
        }
        else
        {
          this.next_page = page+1;
          this.prev_page= page-1;

          if(this.prev_page==0)
          {
            this.prev_page=1;
          }
        }
        this._clientService.getClients(this.token,page).subscribe(
          response=>{
            if(!response.clients)
            {
              this._router.navigate(['/']);
            }
            else
            {
              this.clients = response.clients;
            }
          },
          error=>
          {
            var errorMessage = <any>error;
            if(errorMessage != null)
            {
              var body = JSON.parse(error._body);
              console.log(error);
            }
          }
        );
      });
    }
}
