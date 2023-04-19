import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Pruebas en uiSlice', () => { 
   
    test('debe de regresar el estado por defecto', () => { 
       
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
        // si se le añaden mas propiedades al uiSlice esta prueba fallaría la podriamos poner así
        // expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();

    });

    test('debe de cambiar el isDateModelOpen correctamente', () => { 
       
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal());
        expect( state.isDateModalOpen ).toBeTruthy();
        
        state = uiSlice.reducer( state, onCloseDateModal());
        expect( state.isDateModalOpen ).toBeFalsy();

    });

});