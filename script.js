let currentMusic = 0;
// Data Get
const music = document.querySelector('#audio');
const vidio = document.querySelector('#bgVidio');
const songList = document.querySelector('#songList');

const seekBar = document.querySelector('.seekBar');
const songName = document.querySelector('.musicName');
const artistName = document.querySelector('.artitsName');
const cover = document.querySelector('.disk');
const musicDuration = document.querySelector('.songDuration');
const currentTime = document.querySelector('.time');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.btn-backward');
const nextBtn = document.querySelector('.btn-forward');
const playerBox = document.querySelector('.musicPlayer');
const home = document.querySelector('.musicList');
const back = document.querySelector('.backHome');

// LIST SONG
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.classList.add('song-item');

    const info = document.createElement('div');
    info.classList.add('song-info');
    info.innerText = `${song.name} - ${song.artist}`;

    const img = document.createElement('img');
    img.src = song.cover;
    img.alt = song.name;
    img.classList.add('song-cover');

    li.appendChild(img);
    li.appendChild(info);
// HOME LOGIC
    li.addEventListener('mouseenter', ()=> {
        vidio.src = song.vidio;
        vidio.classList.add('active');
        vidio.play();
    });
    li.addEventListener('mouseleave', ()=> {
        if (!playerBox.classList.contains('visible')) {
        vidio.classList.remove('active');
        vidio.pause();
        vidio.currentTime = 0;
        }
    });
    li.addEventListener('click', ()=> {
        home.style.display = 'none';
        setMusic(index);
        playMusic();
        playerBox.style.display = 'block';
        playerBox.classList.add('visible');
    });
    songList.appendChild(li);
});

// Back
back.addEventListener('click', ()=> {
    home.style.display = 'block';
    playerBox.style.display = 'none';
    playerBox.classList.remove('visible');
    stopMusic();
})

// play-pause
playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
        vidio.classList.add('active');
    } else{
        music.pause();
        vidio.classList.remove('active')
    }
    playBtn.classList.toggle('pause');
    cover.classList.toggle('play');
})
music.addEventListener('ended', () =>{
    playBtn.classList.add('pause');
    cover.classList.remove('play');
    vidio.classList.remove('active');
});

// prev-next
nextBtn.addEventListener('click', ()=> {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})
prevBtn.addEventListener('click', ()=> {
    if(currentMusic <= songs.length - 1){
        currentMusic = 0;
    }else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})
const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    cover.classList.add('play');
    playBtn.classList.add('active');
    vidio.classList.add('active');
}
const stopMusic = () => {
    music.pause();
    music.currentTime = 0;
    vidio.pause();
    vidio.currentTime0;
    playBtn.classList.add('pause');
    cover.classList.remove('play');
    playBtn.classList.add('pause');
    playBtn.classList.remove('active');
    vidio.classList.remove('active');
}

// music Bar and Duration
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;
    vidio.src = song.vidio;
    vidio.load();

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    cover.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    music.onloadedmetadata = () => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    };
};

// Format Time Duration
setMusic(0)
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
}
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentMusic) == Math.floor(seekBar.max)){
        nextBtn.click()
    }
}, 500)
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value
})
