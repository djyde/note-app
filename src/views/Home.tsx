import * as React from 'react'
import db, { Note } from '../db'

function Home() {
  const [ notes, setNotes ] = React.useState([] as Note[])

  React.useEffect(() => {
    init()
  }, [])

  async function init() {
    const res = await db.notes.toArray()
    setNotes(res)
  }

  return (
    <div>
      {notes.map(note => {
        return (
          <div key={note.id} className='p-4'>
            <div className='font-bold'>{note.title}</div>
            <div className='text-gray-500'>
              {note.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home