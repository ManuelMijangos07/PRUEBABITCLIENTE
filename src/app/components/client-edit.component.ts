import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../services/user.service';
import {ClientService} from '../services/client.service';
import {GLOBAL} from '../services/global';
import {Client} from '../models/client';

@Component({
  selector: 'client-edit',
  templateUrl: '../views/client-add.html',
  providers:[UserService, ClientService]
})

export class ClientEditComponent implements OnInit{
  public titulo: string;
  public client: Client;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _clientService: ClientService

  ){
    this.titulo = 'Actualizar Cliente';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.client=new Client ('','','','');
    }

    ngOnInit()
    {
      console.log('client-add.component.ts cargado');
      this.getClient();
    }

    getClient()
    {
      this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._clientService.getClient(this.token, id).subscribe(
          response =>{

            if(!response.client)
            {
              this._router.navigate(['/']);
            }
            else
            {
              this.client = response.client;
            }
          },
          error =>
          {
            this.alertMessage = <any>error;

            if(this.alertMessage != null)
            {
              var body = JSON.parse(error._body);
              //this.alertMessage = body.message;

              console.log(error);
            }
          }
        );
      });
    }

    onSubmitNew()
    {
      this._route.params.forEach((params: Params) =>{
        let id = params['id'];
      this._clientService.editClient(this.token,id,this.client).subscribe(
        response=>{

          if(!response.client)
          {
            this.alertMessage='error en el servidor';
          }
          else
          {
            this.alertMessage='el cliente se ha actualizado correctamente';
            //  this.client = response.client;
              //this._router.navigate(['/editar-cliente'], response.client._id);
          }
        },
        error=>{
          var errorMessage = <any>error;

          if(errorMessage!=null)
          {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
      });
    }

}
