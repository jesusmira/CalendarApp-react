

export const events = [
    {
        id: '1',
        start: new Date('2023-03-08 13:00:00'),
        end: new Date('2023-03-08 13:30:00'),
        title:'Cumpleaños de Fernando',
        notes: 'Alguna nota',
    },
    {
        id: '2',
        start: new Date('2023-03-02 13:00:00'),
        end: new Date('2023-03-02 13:30:00'),
        title:'Cumpleaños de Melisa',
        notes: 'Alguna nota de Melisa',
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent:  { ...events[0] }
}
