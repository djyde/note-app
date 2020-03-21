import * as React from 'react'
import db, { Note } from '../db'
import Home from '../views/Home'

const App = () => {

  const [view, setView] = React.useState(<Home />)
  
  return (
    <div>
      {view}
    </div>
  )
}

export default <App />
