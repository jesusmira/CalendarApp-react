import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFromFields = {
    loginEmail:    '',
    loginPassword: ''
}
const registreFromFields = {
    registreName:      '',
    registreEmail:     '',
    registrePassword:  '',
    registrePassword2: '',

}

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegistre } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm( loginFromFields );
    const { registreName, 
            registreEmail, 
            registrePassword, 
            registrePassword2, 
            onInputChange: onRegistreInputChange }
             = useForm( registreFromFields );


    const loginSubmit = (event) => {
            event.preventDefault();
            // console.log({loginEmail, loginPassword});
            startLogin({email: loginEmail, password: loginPassword});
    }
    const registreSubmit = (event) => {
            event.preventDefault();
            if( registrePassword !== registrePassword2 ){
                Swal.fire('Error en Registro', 'Contraseñas no son iguales', 'error');
                return;
            }
            // console.log({ registreName, registreEmail, registrePassword, registrePassword2 });
            startRegistre( {name: registreName, email: registreEmail, password: registrePassword } );
    }

    useEffect(() => {
      if( errorMessage !== undefined ){
        Swal.fire('Error en la Autentificación', errorMessage, 'error' );
      }
    

    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registreSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registreName'
                                value={ registreName }
                                onChange={ onRegistreInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registreEmail'
                                value={ registreEmail }
                                onChange={ onRegistreInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registrePassword'
                                value={ registrePassword }
                                onChange={ onRegistreInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registrePassword2'
                                value={ registrePassword2 }
                                onChange={ onRegistreInputChange } 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
