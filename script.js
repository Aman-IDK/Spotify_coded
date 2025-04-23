// Style

let search_input = document.querySelector(".inp_box")
let search_svg = document.querySelector(".search_svg")

search_input.addEventListener("mouseover", () => {
    search_svg.classList.add("hovered_svg");
})
search_input.addEventListener("mouseout", () => {
    search_svg.classList.remove("hovered_svg");
})
search_input.addEventListener("focus", () => {
    // search_input.style.border = "none"  fix border
    search_input.id = "hovered_inp"
    search_svg.id = "hovered_svg"
});
search_input.addEventListener("blur", () => {
    // search_input.style.border = ""
    search_input.id = ""
    search_svg.id = ""
});

// style end

// working

console.log("Let's write js");

let currentSong = new Audio(); 

function SecondsToMinutes(seconds_arg) {
    let minutes = String(Math.floor(seconds_arg/60)).padStart(2,"0")
    let seconds = String(Math.floor(seconds_arg%60)).padStart(2, "0")
    
    return `${minutes}:${seconds}`
}

const playMusic = (track, pause=false) =>{
    currentSong.src = "/songs/"+track;
    if(!pause){
        currentSong.play()
        play.src = "pause.svg"   
    }
    document.querySelector(".songinfo").innerHTML = track.split(".mp3")[0]
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function getSongs() {
    let a = (await fetch("http://127.0.0.1:3000/songs/"))
    let response = await a.text()
    // console.log(response);

    let div = document.createElement('div')
    div.innerHTML = response
    let as = div.getElementsByTagName('a')
    // console.log(as);

    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split('/songs/')[1].split('.mp3')[0])
        }
    }

    return (songs);
}

async function main() {
    let songs = await getSongs()
    // console.log(songs);
    playMusic(songs[0]+".mp3", true)

    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0]
    for (const song of songs) {
        songUL.innerHTML += `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div> ${song.replaceAll('%20', ' ')}</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="" srcset="">
                            </div>
                        </li>`
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").getElementsByTagName("div")[0].innerHTML);
            playMusic((e.querySelector(".info").getElementsByTagName("div")[0].innerHTML+".mp3").trim());
        })
    })

    play.addEventListener("click", ()=>{
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // Listen for time update
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${SecondsToMinutes(currentSong.currentTime)}/${SecondsToMinutes(currentSong.duration)}`
    })
}

main()