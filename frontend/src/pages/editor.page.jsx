import React, { createContext, useState } from 'react'
import BlogEditor from '../components/blog-editor.component'
import PublishForm from '../components/publish-form.component'

const blogStructure = { title: '', des: '', banner: '', content: [], tags: [], author: { personal_info: {} } }

export const EditorContext = createContext({})

const Editor = () => {

  const [editorState, setEditorState] = useState('editor')
  const [textEditor, setTextEditor] = useState({isReady:false})
  const [blog, setBlog] = useState(blogStructure)

  return (
    <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState,textEditor,setTextEditor,setEditorState}}>
      {
        editorState == 'editor' ? <BlogEditor /> : <PublishForm />
      }
    </EditorContext.Provider>
  )
}

export default Editor
