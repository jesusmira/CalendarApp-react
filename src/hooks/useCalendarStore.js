import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';



export const useCalendarStore = () => {
  
    const distpatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        distpatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            // Todo Update Event
            if( calendarEvent.id){
                // Actualizando
                const { data } = await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                distpatch( onUpdateEvent( { ...calendarEvent, user } ));
                return;
    
            }           
            // Creando
            const { data} = await calendarApi.post('/events', calendarEvent );
            distpatch( onAddNewEvent({...calendarEvent, id: data.evento.id, user } ) );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error' );

            
        }
        

    }

    const startDeletingEvent = async( ) => {
        // TODO: LLegar al Backend
        try {
            if( activeEvent.id){
                await calendarApi.delete(`/events/${ activeEvent.id }`);
                distpatch( onDeleteEvent());
                return;
    
            } 
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error' );
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            distpatch( onLoadEvents( events) )
            // console.log(events);
        } catch (error) {
            console.log('Error cargando Eventos');
            console.log(error);
        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected : !!activeEvent, 

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
