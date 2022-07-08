console.log("welcome to v-tune");
//variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let duration=document.getElementById('duration');
let gif=document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songName:"Tillu Anna Dj Pedithe",filepath:"songs/1.mp3",coverpath:"DJ-Tillu-2.jpg"},
    {songName:"Kommuram Bheemudo",filepath:"songs/2.mp3",coverpath:"rrr.png"},
    {songName:"Pataas Pilla",filepath:"songs/3.mp3",coverpath:"DJ-Tillu-2.jpg"},
    {songName:"La La Bheemla",filepath:"songs/4.mp3",coverpath:"bheemla nayak.jpg"},
    {songName:"Dheera Dheera",filepath:"songs/5.mp3",coverpath:"kgf.jpg"},
    {songName:"Spirit Of Jersey",filepath:"songs/6.mp3",coverpath:"jersey.jpg"},
    {songName:"Rise Of Shyam",filepath:"songs/7.mp3",coverpath:"ssr.jpg"},
    {songName:"Naatu Naatu",filepath:"songs/8.mp3",coverpath:"rrr.png"},
    {songName:"Needa Padadhani",filepath:"songs/9.mp3",coverpath:"jersey.jpg"},
]
 songItems.forEach((element, i)=>{
     
    element.getElementsByTagName("img")[0].src = songs[i].coverpath ;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}) 

//play and pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused ||  audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    
   }
   else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity=0; 
   }
}) 
//Listen
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //update duration bar
    progress = parseInt((audioElement.currentTime/audioElement.duration) *100);
    //console.log(progress);
    duration.value=progress;

})
 
duration.addEventListener('change',()=>{
    audioElement.currentTime= duration.value * audioElement.duration/100;
})
const makeAllPlays = () =>{     
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause'); 
    element.classList.add('fa-circle-play');
})
}
     
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        //masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
   
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    } 
    audioElement.src = `songs/${songIndex+1}.mp3`;
    //masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    //masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})




