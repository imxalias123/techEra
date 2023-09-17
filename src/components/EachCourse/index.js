import './index.css'
import {Link} from 'react-router-dom'

const EachCourse = props => {
  const {details} = props
  const {id, name, logoUrl} = details
  return (
    <Link to={`/${id}`} className="link">
      <li>
        <img src={logoUrl} alt={name} className="img" />
        <h1 className="logo-h1">{name}</h1>
      </li>
    </Link>
  )
}

export default EachCourse
