import Dexie from 'dexie'

class DB extends Dexie {

  notes: Dexie.Table<Note, number>

  constructor() {
    super('note')
    this.version(1).stores({
      notes: '++id, title, content, createdAt'
    })

    this.notes = this.table('notes')
  }
}

export default new DB()

export interface Note {
  id?: string
  title: string
  content: string
  createdAt: string
}
