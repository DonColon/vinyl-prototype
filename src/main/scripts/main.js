/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
import './components/components.js';

import config from '../../../application.config.json';

import Playlist from './playlist.js';
import VinylView from './vinyl-view.js';
import MusicPlayer from './music-player.js';


(function main() {
    const elements = document.querySelectorAll('*[id]');
    const components = {};

    for(const element of elements)
        components[element.id] = element;

    fetch('../resources/playlist.json')
        .then(response => response.json())
        .then(playlistInfo => {
            const playlist = new Playlist(playlistInfo);
            const view = new VinylView(components, playlist);
            const player = new MusicPlayer(playlist, view);
        });
})();
