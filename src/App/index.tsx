import * as React from 'react'
import Home from '../views/Home'

import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()
import { match } from 'path-to-regexp'
import Editor from '../views/Editor'

const App = () => {

  const [view, setView] = React.useState(null as null | JSX.Element)

  React.useEffect(() => {
    const clean =  history.listen((location, action) => {
      const matchEditor = match<{ id: string }>('/editor/:id')

      if (location.pathname === '/') {
        setView(<Home />)
      } else if (location.pathname === '/editor') {
        setView(<Editor />)
      } else {
        const m = matchEditor(location.pathname)
        if (m) {
          setView(<Editor id={m.params.id} />)
        }
      }
    })

    // initial route
    history.push(location.pathname)

    return clean
  }, [])
  
  return (
    <div>
      {view}
    </div>
  )
}

export default <App />
