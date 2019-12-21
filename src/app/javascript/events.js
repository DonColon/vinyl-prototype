/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
class EventDispatcher
{
    constructor()
    {
        this.events = new Map();
    }

    on(event, listener)
    {
        (this.events.has(event)) ? 
            this.events.get(event).push(listener) : this.events.set(event, [listener]);
    }

    emit(event, args)
    {
        if(this.events.has(event))
            this.events.get(event).slice(0).forEach(listener => listener(args));
    }
}

export default EventDispatcher;
