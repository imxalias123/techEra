import './index.css'
import {Link} from 'react-router-dom'

const Header = () => (
  <div className="header-container">
    <Link to="/" className="link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo"
      />
    </Link>
  </div>
)

export default Header
