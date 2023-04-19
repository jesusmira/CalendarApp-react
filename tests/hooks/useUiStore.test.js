import { renderHook }  from '@testing-library/react';
import { useUiStore }  from '../../src/hooks/useUiStore';
import { Provider } from 'react-redux';
import { uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const getMockStore = ( initialState) =>{

    return configureStore({ 

        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }

    })

}

describe('Pruebas en useUiStore', () => { 
   
    test('debe de regresar los valores por defecto', () => { 

        const mokStore = getMockStore({ isDateModalOpen: false });

        const { result} =  renderHook( () => useUiStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );
        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
       })
       
    });

    test('openDateModal debe de colocar el true en isDateModalOpen', () => { 
       
        const mokStore = getMockStore({ isDateModalOpen: false });

        const { result} =  renderHook( () => useUiStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        const { openDateModal } = result.current;

        act( () => {
            openDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();

    });


    test('closeDateModal debe de colocar false en isDateModalOpen', () => { 
       
        const mokStore = getMockStore({ isDateModalOpen: true });

        const { result} =  renderHook( () => useUiStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );

        const { closeDateModal } = result.current;
        
        act( () => {
            closeDateModal();
        });


        expect( result.current.isDateModalOpen ).toBeFalsy();


    });

    test('toggleDateModal debe de cambiar el estado respectivamente', () => { 
       
        const mokStore = getMockStore({ isDateModalOpen: true });

        const { result} =  renderHook( () => useUiStore(),{
            wrapper: ({children}) => <Provider store={ mokStore }>{ children }</Provider>
        } );


        act( () => {
            result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

        act( () => {
            result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();


    });

});