import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class DetailsCourses extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coursesData: {},
  }

  componentDidMount() {
    this.getApiUrl()
  }

  getApiUrl = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    console.log(response)
  }

  renderProgressView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )
}

renderSuccessView = () => {
    
}

renderFailureView = () => {

}

renderStatusDetails = () => {
  const {apiStatus} = this.state

  switch (apiStatus) {
    case apiStatusConstants.success:
      return this.renderSuccessView()
    case apiStatusConstants.failure:
      return this.renderFailureView()
    case apiStatusConstants.inProgress:
      return this.renderProgressView()
    default:
      return null
  }
}

render(){
    const {apiStatus} = this.state
return (
  <div>
    <Header />
    {this.renderStatusDetails()}
  </div>
)
}
export default DetailsCourses
