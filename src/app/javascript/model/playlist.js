/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
import EventDispatcher from '../events.js';


class Playlist extends EventDispatcher
{
    constructor(playlistInfo)
    {
        super();
        this._name = playlistInfo.name;
        this._creationDate = playlistInfo.creationDate;
        this._owner = playlistInfo.owner;
        this._visibility = playlistInfo.visibility;
        this._songs = playlistInfo.songs || [];
        this._selectedIndex = 0;
    }


    get name()
    {
        return this._name;
    }

    set name(name)
    {
        this._name = name;
    }

    get creationDate()
    {
        return this._creationDate;
    }

    set creationDate(creationDate)
    {
        this._creationDate = creationDate;
    }

    get owner()
    {
        return this._owner;
    }

    set owner(owner)
    {
        this._owner = owner;
    }

    get visibility()
    {
        return this._visibility;
    }

    set visibility(visibility)
    {
        this._visibility = visibility;
    }

    get songs()
    {
        return this._songs.slice(0);
    }

    addSong(song)
    {
        this._songs.push(song);
    }

    removeSong(index)
    {
        this._songs.splice(index, 1);
    }

    get selectedIndex()
    {
        return this._selectedIndex;
    }

    set selectedIndex(index)
    {
        this._selectedIndex = index;
        this.emit('selectedIndexChanged', index);
    }
}

export default Playlist;
