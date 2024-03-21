import { HfInference } from '@huggingface/inference'
import { config } from 'dotenv'

config()

const hf = new HfInference(process.env.HF_ACCESS_TOKEN)

const imageUrl = "https://static.fundacion-affinity.org/cdn/farfuture/hHjlkRJJ0mnR1zVGzWk-SEX1BpGXvE56GGuN6h89MWM/mtime:1528830329/sites/default/files/descubre-como-se-comporta-un-gato.jpg?itok=n2kVSTSl"
const modelImage = "Salesforce/blip-image-captioning-large"
const modelTranslation = "Helsinki-NLP/opus-mt-en-es"

try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    const resul = await hf.imageToText({
        data: blob,
        model: modelImage,
    })

    let text = resul.generated_text

    const resul2 = await hf.translation({
        model: modelTranslation,
        inputs: "Translation: " + text,
        parameters: {
            src_lang: "en",
            tgt_lang: "es"
        }
    })

    // console.log(text)
    console.log("Esto es lo que contiene la imagen: " + text + " | " + resul2.translation_text)

} catch (e) {

    console.error(e)

}
