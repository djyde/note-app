import * as React from 'react'
import db, { Note } from '../db'
import { history } from '../App'

export default function Editor ({
  id
}: {
  id?: string
}) {

  const titleRef = React.useRef(null as null | HTMLInputElement)
  const contentRef = React.useRef(null as null | HTMLTextAreaElement)

  const note = React.useRef(null as null | Note)
  const [ loading, setLoading ] = React.useState(true)

  const editMode = id !== undefined

  React.useEffect(() => {
    init()
  }, [])

  async function init() {
    if (editMode){
      // fetch content 
      const item = await db.notes.get(Number(id))
      if (item) {
        note.current = item
      } else {
        // not found
      }

      setLoading(false)
    } else {
      const date = `${Date.now()}`
      note.current = { title: '', content: '', createdAt: date, updatedAt: date }
      setLoading(false)
    }
  }

  async function save() {
    if (titleRef.current !== null && contentRef.current !== null) {
      const body = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        createdAt: editMode ? note.current!.createdAt : `${Date.now()}`
      }

      if (editMode) {
        const now = `${Date.now()}`
        await db.notes.put({
          id: Number(id!),
          ...body,
          updatedAt: now
        })
        alert('已保存')
      } else {
        const now = `${Date.now()}`
        await db.notes.put({
          ...body,
          updatedAt: now,
          createdAt: now,
        })
        history.push('/')
      }
    }
  }

  if (!note.current) {
    return <div></div>
  } else {
    return (
      <div className='h-full flex flex-col'>
        <div className='p-2 flex justify-between bg-white'>
          <a className='text-gray-900' onClick={_ => history.push('/')}>返回</a>
          <a className='text-gray-900' onClick={save}>{editMode ? '保存' : '新建'}</a>
        </div>
        <div>
          <input placeholder='标题' spellCheck={false} className='block w-full outline-none p-2 text-2xl font-bold text-gray-900' ref={titleRef} defaultValue={note.current.title} type="text"/>
        </div>
        <div className='flex-1'>
          <textarea placeholder='内容...' className='outline-none block w-full h-full p-2 text-gray-900 resize-none'  spellCheck={false} ref={contentRef} name="content" id="" defaultValue={note.current.content}></textarea>
        </div>
      </div>
    )
  }
}