import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en AuthSlice', () => { 
   
    test('debe de regresar el estado inicial', () => { 
       
        expect( authSlice.getInitialState()).toEqual( initialState );

    });

    test('debe de realizar un login ', () => { 

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect( state ).toEqual( {
            status: 'authenticated',
            user: testUserCredentials,
            errorMesssage: undefined
        });

       
    });
    test('debe de realizar el logout ', () => { 

        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });

       
    });
    test('debe de realizar el logout ', () => { 

        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
      
    });

    test('debe de limpiar el mensaje de error', () => { 
       
        const errorMessage = 'Credenciales no válidas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        const newState = authSlice.reducer( state , clearErrorMessage());

        expect( newState.errorMessage).toBe( undefined );

    });

    // Todo: Pruebas en onChecking (mandando por ejemplo el authenticated )

    test('debe de reailzar el onChecking', () => { 
       
        const state = authSlice.reducer( authenticatedState, onChecking());
        
        expect( state ).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined
        })

    });

});