import React from 'react'

const Image = ({ url, caption }) => {
    return (
        <div className='w-full flex flex-col justify-center items-center md:items-start'>
            <img src={url} alt="" className='' />
            {caption?.length > 0 && <p className='w-full md:text-start text-center my-3 md:mb-12 text-base text-gray-400'>{caption}</p>}
        </div>
    )
}

const Quote = ({ quote, caption }) => {
    return (
        <div className='bg-purple-200/10 p-3 pl-5 border-l-4 border-purple-500'>
            <p className='leading-10 text-xl md:text-2xl'>{quote}</p>
            {caption?.length > 0 && <p className='w-full text-purple-500 text-base md:text-start text-center my-3 md:mb-12 text-base text-gray-400'>{caption}</p>}
        </div>
    )
}

const List = ({ items, style }) => {
    return (
        <ol className={`pl-5 ${style == 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {
                items.map((listItem, i) => {
                    return <li key={i} className='my-4' dangerouslySetInnerHTML={{ __html: listItem }}></li>
                })
            }
        </ol>
    )
}

const BlogContent = ({ block }) => {

    let { type, data } = block

    if (type == 'paragraph') {
        return <p className='' dangerouslySetInnerHTML={{ __html: data?.text }}></p>
    }

    if (type == 'header') {
        if (data.level == 3) {
            return <h3 className='text-3xl font-bold' dangerouslySetInnerHTML={{ __html: data?.text }}></h3>
        }
        return <h2 className='text-4xl font-bold' dangerouslySetInnerHTML={{ __html: data?.text }}></h2>
    }

    if (type == 'image') {
        return <Image url={data.file.url} caption={data.caption} />
    }

    if (type == 'quote') {
        return <Quote quote={data.text} caption={data.caption} />
    }

    if (type == 'list') {
        return <List style={data.style} items={data.items} />
    }
    else {
        return <h1>This is Blog</h1>
    }

}

export default BlogContent
