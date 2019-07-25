/*************************************************************************************/
/* vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
class MusicPlayer
{
    constructor(playlist)
    {
        this.playlist = playlist;
        this.index = 0;
    }

    play(index)
    {
        const song = (typeof index === 'number') ? this.playlist[index] : this.playlist[this.index];
        const self = this;

        song.howl = new Howl({
            src: [song.filepath],
            html5: true,
            onend: () => self.skip('next');
        });

        song.howl.play();
        this.index = index;
    }

    pause()
    {
        const currentSong = this.playlist[this.index].howl;
        currentSong.pause();
    }

    skip(direction)
    {
        let index = 0;
        if(direction === 'next') {
            index = this.index + 1;
            if(index >= this.playlist.length)
                index = 0;
        } else if(direction === 'previous') {
            index = this.index - 1;
            if(index < 0)
                index = this.playlist.length - 1;
        }
        this.skipTo(index);
        return index;
    }

    skipTo(index)
    {
        const currentSong = this.playlist[this.index].howl;
        currentSong.stop();
        this.play(index);
    }

    seek(percentage)
    {
        const currentSong = this.playlist[this.index].howl;
        if (currentSong.playing())
            currentSong.seek(currentSong.duration() * percentage);
    }

    volume(value)
    {
        Howler.volume(value);
    }

    currentSong()
    {
        return this.index;
    }
}
