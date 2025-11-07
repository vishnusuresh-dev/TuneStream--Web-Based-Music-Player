let songListings = document.querySelector(".song-listings");
let audioSrc = document.querySelector(".audio");
let songName = document.querySelector(".song-name");
let playPause = document.querySelector(".play-pause");
let forward = document.querySelector(".forward");
let backward = document.querySelector(".backward");
let runningAlbum = document.querySelector(".current-running-album");

async function  songList() {
  const response = await fetch("./songs.json");
  const songs = await response.json();
  for(let i=0;i<songs.length;i++){
        const title = songs[i].title;
        let songListElement = document.createElement("SPAN");
        songListElement.textContent = title;
        songListElement.classList.add(`song${i}`, "song-item");
        //when user clicks on a song from list
        songListElement.addEventListener("click",()=>{
          //to set all color back to white
          let colorDefault= document.querySelectorAll(`.song-item`);
          console.log(colorDefault);
          for(let j =0;j<colorDefault.length;j++){
            colorDefault[j].style.color="grey";
          }
          // to highlight the current track
          let songHighlight = document.querySelector(`.song${i}`);
          songHighlight.style.color="white";
          let footerPanel = document.querySelector(".footer-panel");
          footerPanel.style.display="flex";
          // to show song & artist name  dynamically on footer panel
          let songInfo = document.querySelector('.song-info');
          songInfo.innerHTML="";
          let songTitle = document.createElement("SPAN");
          songTitle.classList.add("song-name");
          let artistName = document.createElement("P");
          artistName.classList.add("artist-name");
          songTitle.textContent = title;
          artistName.textContent = songs[i].artist;
          songInfo.appendChild(songTitle);
          songInfo.appendChild(artistName);
          //to play the selected song
          audioSrc.src = songs[i].file;
          audioSrc.play();
          // to view album art on the footer panel
          let albumArtInfo = document.querySelector(".album-art-info")
          let albumArt = document.createElement("IMG");
          albumArtInfo.innerHTML="";
          albumArt.classList.add("album-art")
          albumArt.src=`./assets/albumart${i}.jpg`;
          albumArtInfo.appendChild(albumArt);
          playPause.innerHTML="";
          playPause.innerHTML=`<i class="fa-solid fa-pause" ></i>`;
          //to view album details on the main right panel
          runningAlbum.innerHTML="";
          let albumDisplay = document.createElement("DIV")
          albumDisplay.classList.add("album-display")
          let albumName = document.createElement("P");
          albumName.classList.add("album-para");
          albumName.innerHTML=title;
          let singerName = document.createElement("P");
          singerName.classList.add("singerName");
          singerName.innerHTML=songs[i].artist;
          let displayArt = document.createElement("IMG");
          displayArt.src=`./assets/albumart${i}.jpg`;
          albumDisplay.appendChild(displayArt);
          albumDisplay.appendChild(albumName);
          albumDisplay.appendChild(singerName);
          runningAlbum.appendChild(albumDisplay);
      }); 
      songListings.appendChild(songListElement);

  }
      playControls();
}

songList();

function playControls() {
  playPause.addEventListener("click", () => {
    if (audioSrc.paused) {
      // Play the song
      audioSrc.play();
      playPause.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
      // Pause the song
      audioSrc.pause();
      playPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  });
}

