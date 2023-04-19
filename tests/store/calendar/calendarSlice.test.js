import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/CalendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";


describe('Prubas en calendarSlice', () => { 
   
    test('debe de regresar el estado por defecto', () => { 
       
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test('onSetActiveEvent debe activar el evento', () => { 
       
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0]) );
        expect( state.activeEvent ).toEqual( events[0] );

    });

    test('onAddNewEvent debe agregar el evento', () => { 
       
        const newEvent = {
            id: '3',
            start: new Date('2022-03-08 13:00:00'),
            end: new Date('2022-03-08 13:30:00'),
            title:'Cumpleaños de Jesús',
            notes: 'Alguna nota!!!',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent));
        expect( state.events ).toEqual([...events, newEvent])

    });

    test('onUpdateEvent debe de actualizar el evento', () => { 
       
        const updateEvent = {
            id: '1',
            start: new Date('2022-03-08 13:00:00'),
            end: new Date('2022-03-08 13:30:00'),
            title:'Cumpleaños de Jesús actualizado',
            notes: 'Alguna nota actualizada',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updateEvent));
        expect( state.events ).toContain( updateEvent );

    });

    // TODO: hacer los test de onDelete , onLogoutCalendar y onLoadEvents

    test('onDeleteEvent debe de borrar el evento activo', () => { 
       
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent());
        expect (state.activeEvent).toBe( null );
        expect( state.events).not.toContain( events[0]);

    });

    
    test('onLoadEvents debe establecer los eventos', () => { 
       
        const state = calendarSlice.reducer(initialState, onLoadEvents( events ));
        expect( state.isLoadingEvents).toBeFalsy();
        expect ( state.events ).toEqual( events);

        const newState = calendarSlice.reducer(state, onLoadEvents( events ));
        expect ( newState.events.length).toBe( events.length);
        
    });
    
    test('onLogoutCalendar debe de limpiar el estado', () => { 
       
        const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());
        expect( state ).toEqual( initialState );

    });



});