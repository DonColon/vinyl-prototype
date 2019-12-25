/** ********************************************************************************** */
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/** ********************************************************************************** */
import EventDispatcher from '../core/events';


class VinylView extends EventDispatcher {
    constructor(components, playlist) {
        super();
        this.components = components;
        this.playlist = playlist;

        playlist.on('selectedIndexChanged', () => this.update());

        this.components.playButton.addEventListener('click', () => {
            this.emit('play');
            this.showPauseButton();
        });

        this.components.pauseButton.addEventListener('click', () => {
            this.emit('pause');
            this.showPlayButton();
        });

        this.components.nextSong.addEventListener('click', () => {
            this.emit('next');
            this.showPauseButton();
        });

        this.components.previousSong.addEventListener('click', () => {
            this.emit('previous');
            this.showPauseButton();
        });

        this.update();
    }


    update(index) {
        const song = (typeof index === 'number')
            ? this.playlist.songs[index] : this.playlist.songs[this.playlist.selectedIndex];

        this.components.playlistTitle.innerHTML = this.playlist.name;
        this.components.playlistInfo.innerHTML = this.playlist.owner.username;

        this.components.songTitle.innerHTML = song.title;
        this.components.songInfo.innerHTML = `${song.artist} - ${song.album}`;
    }

    showPauseButton() {
        this.components.playButton.style.display = 'none';
        this.components.pauseButton.style.display = 'inline';
    }

    showPlayButton() {
        this.components.pauseButton.style.display = 'none';
        this.components.playButton.style.display = 'inline';
    }
}

export default VinylView;
