import ytdl from "ytdl-core";
import fs from 'fs';
import { error } from "console";

export const download = (videoId) => new Promise((resolve, reject) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId;
    console.log('realizando o download do video... ' + videoId);

    ytdl(videoUrl, { quality: 'lowestaudio', filter:'audioonly' })
    .on("info", (info) =>{
        const seconds = info.formats[0].approxDurationMs / 1000
        console.log(seconds)

        if(seconds > 60){
            throw new Error("A duracao desse video é maior do que 60 segundos")
        }
    }).on("end", () => {
        console.log('download finalizado')
        resolve()
    }).on("erro", (error) => {
        console.log("Nao foi possivel fazer o download desse video", error);
        reject()
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))

})