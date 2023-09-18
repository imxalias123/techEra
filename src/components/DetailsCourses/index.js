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

  /* removeCartItem = () => {
      const {cartList} = this.state
    console.log(cartList.length)
    const afterRemoving = cartList.filter(each => each.id !== id)
    console.log(afterRemoving.length)
    this.setState({
      cartList: afterRemoving,
    })
  } */

  getApiUrl = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)
      this.setState({
        coursesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProgressView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <div className="detailed-view-container">
        <img src={coursesData.imageUrl} alt="name" className="full-image" />
        <div className="text">
          <h1 className="heading-detail">{coursesData.name}</h1>
          <p className="para-detail">{coursesData.description}</p>
        </div>
      </div>
    )
  }

  onRetry = () => {
    this.getApiUrl()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="heading-failure">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

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

  render() {
    const {apiStatus, coursesData} = this.state
    return (
      <div>
        <Header />
        {this.renderStatusDetails()}
      </div>
    )
  }
}

export default DetailsCourses
