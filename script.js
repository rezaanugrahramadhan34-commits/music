const API = "https://api.nexray.eu.cc/downloader/ytplay?q="

const audio = document.getElementById("audio")

const cover = document.getElementById("cover")
const bg = document.getElementById("bg")

const title = document.getElementById("title")
const artist = document.getElementById("artist")

const query = document.getElementById("query")
const search = document.getElementById("search")

const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")

const progress = document.getElementById("progress")
const volume = document.getElementById("volume")

const current = document.getElementById("current")
const duration = document.getElementById("duration")

const channel = document.getElementById("channel")
const views = document.getElementById("views")
const time = document.getElementById("time")

let playing = false

function format(sec){

sec=Math.floor(sec)

let m=Math.floor(sec/60)

let s=sec%60

if(s<10)s="0"+s

return `${m}:${s}`

}

async function loadMusic(keyword){

if(!keyword)return

search.disabled=true

search.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>'

try{

const res=await fetch(API+encodeURIComponent(keyword))

const json=await res.json()

const data=json.result

cover.src=data.thumbnail

bg.style.backgroundImage=`url(${data.thumbnail})`

title.textContent=data.title

artist.textContent=data.channel

channel.textContent=data.channel

views.textContent=data.views

time.textContent=data.duration

audio.src=data.download_url

audio.load()

}catch(e){

alert("Failed load music")

console.log(e)

}

search.disabled=false

search.innerHTML='<i class="fa-solid fa-magnifying-glass"></i>'

}

search.onclick=()=>{

loadMusic(query.value)

}

query.addEventListener("keypress",e=>{

if(e.key==="Enter"){

loadMusic(query.value)

}

})

play.onclick=()=>{

if(!audio.src)return

if(playing){

audio.pause()

}else{

audio.play()

}

}

audio.onplay=()=>{

playing=true

play.innerHTML='<i class="fa-solid fa-pause"></i>'

cover.classList.add("playing")

}

audio.onpause=()=>{

playing=false

play.innerHTML='<i class="fa-solid fa-play"></i>'

cover.classList.remove("playing")

}

audio.onloadedmetadata=()=>{

progress.max=Math.floor(audio.duration)

duration.textContent=format(audio.duration)

}

audio.ontimeupdate=()=>{

progress.value=audio.currentTime

current.textContent=format(audio.currentTime)

}

progress.oninput=()=>{

audio.currentTime=progress.value

}

volume.oninput=()=>{

audio.volume=volume.value

}

document.addEventListener("keydown",e=>{

if(e.code==="Space"){

e.preventDefault()

play.click()

}

})

loadMusic("middle")