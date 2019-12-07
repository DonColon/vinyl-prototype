/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
class EventDispatcher
{
    constructor()
    {
        this.events = {};
    }

    on(event, listener)
    {
        (this.events[event] || (this.events[event] = [])).push(listener);
    }

    emit(event, args)
    {
        (this.events[event] || []).slice(0).forEach(listener => listener(args));
    }
}

export default EventDispatcher;
