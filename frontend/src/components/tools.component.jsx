import React from 'react'
import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import toast from 'react-hot-toast';
import { UploadImage } from '../common/aws'

const uploadImageByUrl = (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        }
        catch (err) {
            reject(err)
        }
    })
    return link.then((url) => ({ success: 1, file: { url } })).catch((err) => console.log(err))
}


const uploadImageByFile = async (e) => {
    let formData = new FormData()
    formData.append('image', e);

    return UploadImage(formData, toast).then((url) => ({ success: 1, file: { url } }))

}

export const tools = {
    embed: Embed,
    list: { class: List, inlineToolbar: true },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByUrl,
                uploadByFile: uploadImageByFile,
            },
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: 'Type Heading..',
            levels: [2, 3],
            defaultLevel: 2
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlinecode: InlineCode
}
