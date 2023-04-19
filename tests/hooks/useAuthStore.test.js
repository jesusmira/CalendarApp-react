import { configureStore } from "@reduxjs/toolkit";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";


const getMockStore = ( initialState) =>{

    return configureStore({ 

        reducer: {
            // ui: uiSlice.reducer
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }

    })

}

describe('Pruebas en useAuthStore', () => { 

    beforeEach( ()=> localStorage.clear());
   
    test('debe de regresar los valores por defecto', () => { 
       
        const mockStore = getMockStore({ ...initialState });

        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogOut: expect.any(Function),
            startRegistre: expect.any(Function)
        })

    });

    test('starLogin debe realizar el login correctamente', async() => { 


        const mokStore = getMockStore({ ...notAuthenticatedState });

        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        await act(async() => {
            await result.current.startLogin( testUserCredentials )
        });

        const { errorMessage, user, status} = result.current;
        expect ({ errorMessage, user, status}).toEqual({
            status: 'authenticated',
            errorMessage: undefined,
            user: { name: 'Test User', uid: '642e6cc7ce27a0810bf74fe9' }
        });

        expect( localStorage.getItem('token')).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String) );

       
    });

    test('startLogin debe de fallar la autenticación', async() => { 

        const mokStore = getMockStore({ ...notAuthenticatedState });

        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        await act(async() => {
            await result.current.startLogin( { email: 'algo@google.com', password: '123789'} )
        });

        const { errorMessage, user, status} = result.current;
        expect( localStorage.getItem('token')).toBe( null);
        expect({ errorMessage, user, status}).toEqual({
            errorMessage: 'Credenciales incorrectas',
            user: {},
            status: 'not-authenticated'
          });

        await waitFor(
            () => expect( result.current.errorMessage).toBe( undefined )
        );  


    });

    test('startRegister debe de crear un usuario', async() => { 

        const newUser = { name: 'Test User2', email: 'algo@google.com', password: '123789'}

        const mokStore = getMockStore({ ...notAuthenticatedState });

        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        const spy = jest.spyOn( calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "54652315846868",
                name: "Test User",
                token: "ALGUN-TOKEN"
            }
        })

        await act(async() => {
            await result.current.startRegistre( newUser )
        });

        const { user, status, errorMessage } = result.current;
        expect({ user, status, errorMessage }).toEqual({
            user: { name: 'Test User', uid: '54652315846868' },
            status: 'authenticated',
            errorMessage: undefined
        });

       spy.mockRestore();
    });

    test('startRegister debe de fallar la creación', async() => { 
       

        const mokStore = getMockStore({ ...notAuthenticatedState });
        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        await act(async() => {
            await result.current.startRegistre( testUserCredentials )
        });

        const { user, status, errorMessage } = result.current;
        expect({ user, status, errorMessage }).toEqual({
            user: {},
            status: 'not-authenticated',
            errorMessage: 'Un usuario existe con ese correo'
        });

    });

    test('checkAuthToken debe de fallar si no hay token', async() => { 
       
        const mokStore = getMockStore({ ...initialState });
        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { user, status, errorMessage } = result.current;
        expect({ user, status, errorMessage }).toEqual({
            user: {},
            status: 'not-authenticated',
            errorMessage: undefined
        });

    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async() => { 
       
        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem( 'token', data.token);

        const mokStore = getMockStore({ ...initialState });
        const { result} =  renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        await act(async() => {
            await result.current.checkAuthToken()
        });

        const { user, status, errorMessage } = result.current;
        expect({ user, status, errorMessage }).toEqual({
            user: { name: 'Test User', uid: '642e6cc7ce27a0810bf74fe9' },
            status: 'authenticated',
            errorMessage: undefined
          });



    });

});