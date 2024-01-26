import React, { createContext, useEffect, useRef, useState } from 'react'
import BlogEditor from '../components/blog-editor.component'
import PublishForm from '../components/publish-form.component'
import { useParams } from 'react-router-dom'
import Loader from '../components/loader.component'
import { getBlog } from '../redux/slices/blogSlice'
import toast, { Toaster } from 'react-hot-toast';
import { store } from '../redux/store/store'
import { useDispatch } from 'react-redux'

const blogStructure = { title: '', des: '', banner: '', content: [], tags: [], author: { personal_info: {} } }

export const EditorContext = createContext()

const Editor = () => {

  let { blog_id } = useParams()

  const [editorState, setEditorState] = useState('editor')
  const [blog, setBlog] = useState(blogStructure)
  const [loading, setLoading] = useState(true)

  const textEditor = useRef()
  const dispatch = useDispatch()

  const fetchBlog = async () => {
    try {
      await dispatch(getBlog({ blog_id, toast, draft: true ,mode:'edit'}))
      let { blog: { blog:data } } = store.getState()
      if (data != null) {
        setBlog(data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setBlog(null)
      console.error('Error fetching blog:', error);
    }
  }

  useEffect(() => {
    if (!blog_id) return setLoading(false)
    fetchBlog()
  }, [])

  return (
    <EditorContext.Provider value={{ blog, setBlog, editorState, textEditor, setEditorState }}>
      <Toaster />
      {
        loading ? <Loader />
          :
          editorState == 'editor' ? <BlogEditor /> : <PublishForm />
      }
    </EditorContext.Provider>
  )
}

export default Editor
