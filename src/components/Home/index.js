import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EachCourse from '../EachCourse'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    list: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getApiRequest()
  }

  onRetry = () => {
    this.getApiRequest()
  }

  getApiRequest = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        list: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailure = () => (
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

  renderHomeDetails = () => {
    const {list} = this.state

    return (
      <div className="home-container">
        <h1 className="heading">Courses</h1>
        <ul>
          {list.map(each => (
            <EachCourse key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderInprogress = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderInprogress()
      default:
        return null
    }
  }

  render() {
    const {list, isLoading, apiStatus} = this.state
    return (
      <div>
        <Header />
        {this.renderStatus()}
      </div>
    )
  }
}
export default Home
