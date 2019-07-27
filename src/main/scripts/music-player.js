/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
class MusicPlayer
{
    constructor(playlist, view)
    {
        this.playlist = playlist;

        view.on('play', () => this.play());
        view.on('pause', () => this.pause());
        view.on('next', () => this.skip('next'));
        view.on('previous', () => this.skip('previous'));
    }

    play(index)
    {
        index = (typeof index === 'number') ? index : this.playlist.selectedIndex;

        const song = this.playlist.songs[index]
        const self = this;

        song.howl = new Howl({
            src: [song.filepath],
            html5: true,
            onend: () => self.skip('next')
        });

        song.howl.play();
        this.playlist.selectedIndex = index;
    }

    pause()
    {
        const currentSong = this.playlist.songs[this.playlist.selectedIndex].howl;
        currentSong.pause();
    }

    skip(direction)
    {
        let index = 0;
        if(direction === 'next') {
            index = this.playlist.selectedIndex + 1;
            if(index >= this.playlist.songs.length)
                index = 0;
        } else if(direction === 'previous') {
            index = this.playlist.selectedIndex - 1;
            if(index < 0)
                index = this.playlist.songs.length - 1;
        }
        this.skipTo(index);
    }

    skipTo(index)
    {
        const currentSong = this.playlist.songs[this.playlist.selectedIndex].howl;
        currentSong.stop();
        this.play(index);
    }

    seek(percentage)
    {
        const currentSong = this.playlist.songs[this.playlist.selectedIndex].howl;
        if (currentSong.playing())
            currentSong.seek(currentSong.duration() * percentage);
    }

    volume(value)
    {
        Howler.volume(value);
    }
}

export default MusicPlayer;
