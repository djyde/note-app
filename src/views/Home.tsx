import * as React from 'react'
import db, { Note } from '../db'
import { history } from '../App'
import dayjs = require('dayjs')

function Home() {
  const [ notes, setNotes ] = React.useState([] as Note[])

  React.useEffect(() => {
    init()
  }, [])

  async function init() {
    const res = (await db.notes.toCollection().sortBy('updatedAt')).reverse()
    setNotes(res)
  }

  function pushEditor(id?: string) {
    if (id){
      history.push('/editor/' + id)
    } else {
      history.push('/editor')
    }
  }

  return (
    <div>
      <div className='flex fixed w-12 h-12 rounded-full bg-red-500 bottom-0 right-0 mb-4 mr-4 shadow-lg'>
        <a className='mx-auto self-center text-center text-gray-100 text-sm' onClick={_ => pushEditor()}>新建</a>
      </div>
      {notes.map(note => {
        return (
          <div key={note.id} onClick={_ => pushEditor(note.id!.toString())} className='p-4 border-b-2 border-gray-200'>
            <div className='font-bold'>{note.title}</div>
            <div className='mb-2 text-sm text-gray-500'>
              最近修改：{dayjs(Number(note.updatedAt)).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className='text-gray-500'>
              {note.content.slice(0, 50)}{ note.content.length > 50 && '...' }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home