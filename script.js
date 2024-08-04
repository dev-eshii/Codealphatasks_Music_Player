// script.js

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const songs = [
    {
        title: "Lovebomber Baby",
        artist: "gagni porwal",
        src: "audio/Why did you ghost me You said YOU loved me (Lovebomber baby Lyrics video) @gagniporwal13.mp3"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "path/to/song2.mp3"
    },
    // Add more songs here
];

let songIndex = 0;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;

    // Animate the music info section when loading a new song
    gsap.fromTo(".music-info", 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
}

function playSong() {
    audio.play();
    gsap.to(playBtn, { scale: 1.1, duration: 0.2, ease: "power1.out" });
    playBtn.textContent = 'Pause';
}

function pauseSong() {
    audio.pause();
    gsap.to(playBtn, { scale: 1, duration: 0.2, ease: "power1.out" });
    playBtn.textContent = 'Play';
}

function togglePlayPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();

    // Animate transition when changing songs
    gsap.to(".player", { 
        opacity: 0, 
        duration: 0.5, 
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(".player", { 
                opacity: 1, 
                duration: 0.5, 
                ease: "power2.out" 
            });
        }
    });
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();

    // Animate transition when changing songs
    gsap.to(".player", { 
        opacity: 0, 
        duration: 0.5, 
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(".player", { 
                opacity: 1, 
                duration: 0.5, 
                ease: "power2.out" 
            });
        }
    });
}

playBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Handle adding new music
const musicForm = document.getElementById('music-form');
musicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTitle = document.getElementById('new-title').value;
    const newArtist = document.getElementById('new-artist').value;
    const newAudio = document.getElementById('new-audio').files[0];
    
    if (newAudio) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newSong = {
                title: newTitle,
                artist: newArtist,
                src: event.target.result
            };
            songs.push(newSong);
            alert('New song added successfully!');
            musicForm.reset();
        };
        reader.readAsDataURL(newAudio);
    }
});

// Initial load
loadSong(songs[songIndex]);

// GSAP Animations
gsap.from(".player", {
    duration: 1,
    opacity: 0,
    y: 50,
    ease: "power2.out"
});

gsap.from(".add-music", {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: "power2.out",
    delay: 0.5
});

gsap.from(".add-music h2", {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: "power2.out",
    delay: 0.5
});

gsap.from(".control-btn", {
    duration: 0.5,
    scale: 0.8,
    ease: "back.out(1.7)",
    stagger: 0.2
});

gsap.from(".music-info h2", {
    duration: 1,
    opacity: 0,
    x: -30,
    ease: "power2.out",
    delay: 1
});

gsap.from(".music-info p", {
    duration: 1,
    opacity: 0,
    x: 30,
    ease: "power2.out",
    delay: 1.2
});






