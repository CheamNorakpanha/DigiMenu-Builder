import { Area } from 'react-easy-crop'


export default async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('Could not get canvas context')
    }

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file))
            } else {
                reject(new Error('Could not crop image'))
            }
        }, 'image/jpeg')
    })
}

function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = url
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error('Failed to load image'))
    })
}
