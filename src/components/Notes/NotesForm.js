import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useRef } from 'react'



const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`btn btn-sm note-bg-color margin-fix  ${editor.isActive('bold') ? '' : 'btn-secondary'}`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('italic') ? '' : 'btn-secondary'}`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('strike') ? '' : 'btn-secondary'}`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('code') ? '' : 'btn-secondary'}`}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}
      className={`btn btn-sm note-bg-color margin-fix btn-secondary`}
      >
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}
      className={`btn btn-sm note-bg-color margin-fix btn-secondary`}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('paragraph') ? '' : 'btn-secondary'}`}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('heading', { level: 1 }) ? '' : 'btn-secondary'}`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('heading', { level: 2 }) ? '' : 'btn-secondary'}`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('heading', { level: 3 }) ? '' : 'btn-secondary'}`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('heading', { level: 4 }) ? '' : 'btn-secondary'}`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('heading', { level: 5 }) ? '' : 'btn-secondary'}`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('heading', { level: 6 }) ? '' : 'btn-secondary'}`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('bulletList') ? '' : 'btn-secondary'}`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('orderedList') ? '' : 'btn-secondary'}`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('codeBlock') ? '' : 'btn-secondary'}`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`btn btn-sm note-bg-color margin-fix ${editor.isActive('blockquote') ? '' : 'btn-secondary'}`}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
      className={`btn btn-sm note-bg-color margin-fix btn-secondary`}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}
      className={`btn btn-sm note-bg-color margin-fix btn-secondary`}>
        hard break
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}
      className={`btn btn-sm note-bg-color margin-fix btn-secondary`}>
        undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}
      className={`btn btn-sm note-bg-color margin-fix btn-secondary`}>
        redo
      </button>
    </>
  )
}

const NotesForm = ({ note, handleSetNote, handleDeleteNote }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: note.body
  })

  const titleRef = useRef();

  useEffect(()=>{
      editor?.commands.setContent(note.body)
      titleRef.current.value = note.title
      titleRef.current.defaultValue = note.title
  }, [note, editor])

  return (
    <>
      <div>
        <input className="input-width rounded p-2" type="text" name="title" ref={titleRef} defaultValue={note.title} />
      </div>
      <br />
      <MenuBar editor={editor} />
      <div className="editor-window rounded p-4">
        <EditorContent editor={editor} />
      </div>
      <div>
        <button className="btn btn-sm btn-primary btn-sm button-space" onClick={() => 
        handleSetNote({
            body: editor.getHTML(),
            id: note.id,
            title: titleRef.current.value
          })}>
          Save
        </button>
        <button className="btn btn-sm btn-danger btn-sm button-space" onClick={() => handleDeleteNote({
            id: note.id
          })}>
          Delete
        </button>
      </div>
    </>
  )
}


export default NotesForm