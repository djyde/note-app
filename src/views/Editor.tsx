import * as React from 'react'
import db from '../db'

export default function Editor () {

  const titleRef = React.useRef(null as null | HTMLInputElement)
  const contentRef = React.useRef(null as null | HTMLTextAreaElement)

  return (
    async function save() {
      if (titleRef.current && contentRef.current) {
        db.notes.add({
          title: titleRef.current.value,
          content: contentRef.current.value,
          createdAt: `${Date.now()}`
        })
      }
    }
  )
}