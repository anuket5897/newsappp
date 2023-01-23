import React, { Component } from 'react'
import NewsItems from './NewsItems'
import InfiniteScroll from "react-infinite-scroll-component";
export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0
    }
  }
  getAPIData = async () => {
    var response = ""
    if (this.props.search)
      response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&page=1&pgeSize=20&language=${this.props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    else
      response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&page=1&pgeSize=20&language=${this.props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    var result = await response.json()
    //  console.log(result);
    this.setState({
      articles: result.articles,
      totalResults: result.totalResults,
      page: 1
    })
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    var response = ""
    if (this.props.search)
      response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&page=${this.state.page}$pageSize=20&language=${this.props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    else
      response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&page=${this.state.page}&pageSize=20&language=${this.props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    var result = await response.json()
    //  console.log(result);
    this.setState({ articles: this.state.articles.concat(result.articles) })
  }
  componentDidMount() {
    this.getAPIData()
  }
  componentDidUpdate(oldProps) {
    if (this.props !== oldProps) {
      this.getAPIData()
    }
  }
  render() {
    return (
      <>
        <div className="container-fluid mt-1">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={
              <div className='my-5 text-center'>
                <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
              </div>
            }
          >
            <div className="row">
              <h5 className='background text-light text-center p-2 '>{this.props.q}News Section</h5>
              {
                this.state.articles.map((itme, index) => {
                  return <NewsItems
                    key={index}
                    pic={itme.urlToImage}
                    title={itme.title}
                    description={itme.description}
                    source={itme.source.name}
                    date={itme.publishedAt}
                    url={itme.url}
                  />
                })
              }
            </div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}
