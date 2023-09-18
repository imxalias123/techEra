import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'

import DetailsCourses from './components/DetailsCourses'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses/:id" component={DetailsCourses} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
