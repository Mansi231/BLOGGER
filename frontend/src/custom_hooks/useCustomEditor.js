import { useContext, useEffect } from 'react';
import EditorJs from '@editorjs/editorjs';
import { tools } from '../components/tools.component';
import { EditorContext } from '../pages/editor.page';

const useCustomEditor = () => {

    let { blog, blog: { title, des, tags, content, banner }, setBlog, textEditor, setEditorState } = useContext(EditorContext)
    

    const editor = () => {
        const editorInstance = new EditorJs({
            holder: 'textEditor',
            tools: tools,
            data:Array.isArray(content)? content[0] : content,
            placeholder: "Let's write an awesome story",
            onReady: () => {
                textEditor.current = editorInstance
            },
        })
    }

    useEffect(() => {

        editor()

    }, []);
};

export default useCustomEditor;
