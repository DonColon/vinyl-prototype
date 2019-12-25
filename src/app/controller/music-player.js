/** ********************************************************************************** */
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/** ********************************************************************************** */
import { Howl, Howler } from 'howler';


class MusicPlayer {
    static volume(value) {
        Howler.volume(value);
    }

    constructor(playlist, view) {
        this.playlist = playlist;

        view.on('play', () => this.play());
        view.on('pause', () => this.pause());
        view.on('next', () => this.skip('next'));
        view.on('previous', () => this.skip('previous'));
    }

    play(index) {
        const currentIndex = (typeof index === 'number') ? index : this.playlist.selectedIndex;

        const song = this.playlist.songs[currentIndex];
        const self = this;

        song.howl = new Howl({
            src: [song.filepath],
            onend: () => self.skip('next'),
        });

        song.howl.play();
        this.playlist.selectedIndex = currentIndex;
    }

    pause() {
        const currentSong = this.playlist.songs[this.playlist.selectedIndex].howl;
        currentSong.pause();
    }

    skip(direction) {
        let index = 0;
        if (direction === 'next') {
            index = this.playlist.selectedIndex + 1;
            if (index >= this.playlist.songs.length) index = 0;
        } else if (direction === 'previous') {
            index = this.playlist.selectedIndex - 1;
            if (index < 0) index = this.playlist.songs.length - 1;
        }
        this.skipTo(index);
    }

    skipTo(index) {
        const currentSong = this.playlist.songs[this.playlist.selectedIndex].howl;
        currentSong.stop();
        this.play(index);
    }

    seek(percentage) {
        const currentSong = this.playlist.songs[this.playlist.selectedIndex].howl;
        if (currentSong.playing()) currentSong.seek(currentSong.duration() * percentage);
    }
}

export default MusicPlayer;
