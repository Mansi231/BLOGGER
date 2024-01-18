import React, { useContext } from 'react'
import { EditorContext } from '../pages/editor.page'

const Tag = ({ tag ,tagIndex}) => {

    const {  blog: { title, des, tags, content, banner }, setBlog, blog } = useContext(EditorContext)

    const handleTagDelete = () =>{
        tags = tags.filter((t)=>t != tag)
        setBlog({...blog,tags})
    }

    const handleTagEdit = (e) =>{
        if(e.keyCode == 13 || e.keyCode == 188){
            e.preventDefault();
            let currentTag = e.target.innerText ;
            tags[tagIndex] = currentTag
            setBlog({...blog,tags})
            e.target.setAttribute('contentEditable',false)
        }
    }

    const addEditable= (e) =>{
        e.target.setAttribute('contentEditable',true)
        e.target.focus()
    }

    return (
        <div className='mt-2 mr-2 px-5 relative p-2 bg-white rounded-full inline-block hover:bg-opacity-50 hover:bg-white pr-10'>
            <p className='outline-none text-sm' contentEditable={true} onKeyDown={handleTagEdit} onClick={addEditable}>{tag}</p>
            <button className='mt-1 rounded-full absolute right-3 top-1/2 -translate-y-1/2' onClick={handleTagDelete}><i className="fi fi-rr-cross-small text-xl pointer-events-none"></i></button>
        </div>
    )
}

export default Tag
