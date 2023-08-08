console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


//an array store filtPath,coverpath and songName 
let songs = [
    {songName: "On Top - Karan Aujla", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" ,playTime:"3:03"},
    {songName: "Baller - Shubh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",playTime:"2:28"},
    {songName: "Excuses- Ap Dhillon", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",playTime:"2:56"},
    {songName: "Ma Belle- Ap Dhillon", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",playTime:"2:40"},
    {songName: "Na Ja Tu - King", filePath: "songs/5.mp3", coverPath: "covers/5.jpg",playTime:"3:22"},
    {songName: "No Love - Shubh", filePath: "songs/2.mp3", coverPath: "covers/6.jpg",playTime:"2:50"},
    {songName: "Maan Meri Jaan-King", filePath: "songs/2.mp3", coverPath: "covers/7.jpg",playTime:"4:18"},
    {songName: "Apna Bana le-Arijit", filePath: "songs/2.mp3", coverPath: "covers/8.jpg",playTime:"3:24"}
]


///adding image url and songName of all songs by values store in our array
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("totalTime")[0].innerText = songs[i].playTime; 
})
 

// Handle play/pause click on master button
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
       
        //to coordinate list play-pause with master button
       let currSongIcon = document.getElementById(parseInt(songIndex));
       currSongIcon.classList.remove('fa-circle-play');
       currSongIcon.classList.add('fa-circle-pause');


        
       }
    else{
        audioElement.pause();

        ///new line for making all keys play after pause master song
        makeAllPlays();

        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
   }
})

// Listen to Event timeupdate
audioElement.addEventListener('timeupdate', ()=>{ 

    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;

  //new code adding for auto change after time complete
    if(audioElement.currentTime === audioElement.duration){
        NextSong();
    }
})


//for getting current time by progress bar 
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


//for replace all button wth play icon
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


//play pause buttons in list of array
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 

        //checking button is play or pause
        if(e.target.classList.contains('fa-circle-pause')){

            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.pause();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }else{

            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
       
    })
})


//for previous and next buttons
document.getElementById('next').addEventListener('click', ()=>{
NextSong();
})

document.getElementById('previous').addEventListener('click', ()=>{
    PreviousSong();
})





//function for next song

function NextSong(){
    makeAllPlays();
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }

    //to coordinate list play-pause with master button
    let currSongIcon = document.getElementById(parseInt(songIndex));
    currSongIcon.classList.remove('fa-circle-play');
    currSongIcon.classList.add('fa-circle-pause');

    ///changing audio src value with current song
    audioElement.src = `songs/${songIndex+1}.mp3`;

    //changing inner text of master button by help of our array
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

}

//function for previous song
function PreviousSong(){
    makeAllPlays();
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
     
     //to coordinate list play-pause with master button
    let currSongIcon = document.getElementById(parseInt(songIndex));
    currSongIcon.classList.remove('fa-circle-play');
    currSongIcon.classList.add('fa-circle-pause');

    ///changing audio src value with current song
    audioElement.src = `songs/${songIndex+1}.mp3`;

//changing inner text of master button by hep of our array
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}