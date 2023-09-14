import { pipeline } from '@xenova/transformers';

export async function transcribe(audio){
    try {
        console.log('realizando a transcricao');
        const transcribe = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')

        const transcription = await transcribe(audio, {
            chunk_length_s:30,
            stride_length_s:5,
            language: 'portuguese',
            task: 'transcribe'
        })

        console.log('Transcricao finalizada com sucesso');
        return transcription?.text.replace('[Música]', '')
    } catch (error) {
        throw new Error(error)
    }
}