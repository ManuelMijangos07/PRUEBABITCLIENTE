import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'VIT';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  )
  {
    this.user=new User('','','','','','ROLE_USER','');
    this.user_register=new User('','','','','','ROLE_USER','');
    this.url=GLOBAL.url;
  }

  ngOnInit()
  {
    this.identity= this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  public onSubmit()
  {
    //conseguir datos de usuario idetificado
    this._userService.signup(this.user).subscribe(
      response=>{
        let identity=response.user;
        this.identity = identity;

        if(!this.identity._id)
        {
          alert("El Usuario No Está Identificado");
        }
        else
        {
          //crear elemento en local storage
          localStorage.setItem('identity', JSON.stringify(identity));

          // conseguir el token para enviar a peticion
          this._userService.signup(this.user,'true').subscribe(
            response=>{
              let token=response.token;
              this.token = token;

              if(this.token.length <= 0)
              {
                alert("El Token No Se Ha Generado");
              }
              else
              {
                //crear elemente en local storage para tener usuario sesion
                localStorage.setItem('token', token);
                this.user=new User('','','','','','ROLE_USER','');
              }
            },
            error=>{
              var errorMessage = <any>error;
              if(errorMessage!=null)
              {
                var body = JSON.parse(error._body);
                this.errorMessage=body.message;
                console.log(error);
              }
            }
          );

        }
      },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage!=null)
        {
          var body = JSON.parse(error._body);
          this.errorMessage=body.message;
          console.log(error);
        }
      }
    );
  }

  logout()
  {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }

  onSubmitRegister()
  {
    this._userService.register(this.user_register).subscribe(
      response=>
      {
        let user = response.user;
        this.user_register = user;
        if(!user._id)
        {
          this.alertRegister='Error Al Registrarse';
        }
        else
        {
          this.alertRegister='El Registro Se Ha Realizado Correctamente, Identícate con: '+this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
        }
      },
      error=>
      {
        var errorMessage = <any>error;
        if(errorMessage!=null)
        {
          var body = JSON.parse(error._body);
          this.alertRegister=body.message;
          console.log(error);
        }
      }
    );
  }
}
