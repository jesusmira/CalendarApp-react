import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';



export const useCalendarStore = () => {
  
    const distpatch = useDispatch();
    const {
        events,
        activeEvent
    } = useSelector( state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        distpatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO; LLegar al Backend

        // Todo Bien
        if( calendarEvent._id){
            // Actualizando
            distpatch( onUpdateEvent( { ...calendarEvent } ));

        }else{
            // Creando
            distpatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime() } ) );
        }
    }

    const startDeletingEvent = () => {
        // TODO: LLegar al Backend
        distpatch( onDeleteEvent());
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected : !!activeEvent, 

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
