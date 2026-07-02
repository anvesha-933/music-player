// ==========================
// SONG DATA
// ==========================

const songs = [
    {
        title: "Bairan",
        artist: "Banjaree",
        src: "assets/song1.mp3",
        cover: "assets/cover1.jfif"
    },
    {
        title: "Abhi Na Jao Chhod Kar",
        artist: "Mohammed Rafi and Asha Bhosle",
        src: "assets/song2.mp3",
        cover: "assets/cover2.jfif"
    },
    {
        title: "Ham Tere Pyaar Mein",
        artist: "Lata Mangeshkar",
        src: "assets/song3.mp3",
        cover: "assets/cover3.jfif"
    },
    {
        title: "Ek ajnabee haseena se",
        artist: "Kishore Kumar",
        src: "assets/song 4.mp3",
        cover: "assets/cover4.jfif"
    }
];

// ==========================
// VARIABLES
// ==========================

let currentSong = 0;
let isPlaying = false;

const audio = new Audio();

const cover = document.querySelector(".album-cover img");
const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");
const playlistItems = document.querySelectorAll(".playlist li");

// ==========================
// LOAD SONG
// ==========================

function loadSong(index){

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].src;
    updatePlaylist();

}
function updatePlaylist(){

    playlistItems.forEach((item,index)=>{

        if(index === currentSong){

            item.classList.add("active");

        }else{

            item.classList.remove("active");

        }

    });

}
loadSong(currentSong);


// ==========================
// PLAY SONG
// ==========================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

}

// ==========================
// PAUSE SONG
// ==========================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

}

// ==========================
// PLAY BUTTON
// ==========================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

// ==========================
// NEXT SONG
// ==========================

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

});

// ==========================
// PREVIOUS SONG
// ==========================

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

});

// ==========================
// UPDATE PROGRESS BAR
// ==========================

audio.addEventListener("timeupdate",()=>{

    const progress=(audio.currentTime/audio.duration)*100;

    progressBar.value=progress;

    currentTime.textContent=formatTime(audio.currentTime);

    duration.textContent=formatTime(audio.duration);

});

// ==========================
// SEEK BAR
// ==========================

progressBar.addEventListener("input",()=>{

    audio.currentTime=(progressBar.value/100)*audio.duration;

});

// ==========================
// VOLUME
// ==========================

volume.addEventListener("input",()=>{

    audio.volume=volume.value/100;

});

// Default Volume

audio.volume=0.8;

// ==========================
// AUTO NEXT SONG
// ==========================

audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

});

// ==========================
// TIME FORMAT
// ==========================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    let minutes=Math.floor(time/60);

    let seconds=Math.floor(time%60);

    if(seconds<10){

        seconds="0"+seconds;

    }

    return minutes+":"+seconds;

}