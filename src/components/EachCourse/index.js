import './index.css'
import {Link} from 'react-router-dom'

const EachCourse = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <Link to={`courses/${id}`} className="link">
      <li>
        <img alt="name" src={logoUrl} className="img" />

        <p className="logo-h1">{name}</p>
      </li>
    </Link>
  )
}

export default EachCourse
