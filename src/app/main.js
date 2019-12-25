/** ********************************************************************************** */
/* Vinyl - My own web music player                                                     */
/* Copyright 2019 Dardan Rrafshi                                                       */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE)   */
/** ********************************************************************************** */
// import config from './application.config.json';
import './components/component';

import Playlist from './model/playlist';
import VinylView from './view/vinyl-view';
import MusicPlayer from './controller/music-player';


(function main() {
    const elements = document.querySelectorAll('*[id]');
    const components = {};

    for (const element of elements) components[element.id] = element;

    fetch('../playlist.json')
        .then((response) => response.json())
        .then((playlistInfo) => {
            const playlist = new Playlist(playlistInfo);
            const view = new VinylView(components, playlist);
            MusicPlayer(playlist, view);
        });
}());
