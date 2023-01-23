import React, { useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItems from './NewsItems'
export default function Home(props) {
  var [articles, setarticals] = useState([])
  var [totalResults, settotalResuts] = useState(0)
  var [page, setpage] = useState(1)
  const getAPIData = async () => {
    var response = ""
    if (props.search)
      response = await fetch(`https://newsapi.org/v2/everything?q=${props.search}&page=1&pgeSize=20&language=${props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    else
      response = await fetch(`https://newsapi.org/v2/everything?q=${props.q}&page=1&pgeSize=20&language=${props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    var result = await response.json()
    setarticals(result.articles)
    settotalResuts(result.totalResults)
  }
  const fetchMoreData = async () => {
    setpage(page+1)
    var response = ""
    if (props.search)
      response = await fetch(`https://newsapi.org/v2/everything?q=${props.search}&page=${page}$pgeSize=20&language=${props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    else
      response = await fetch(`https://newsapi.org/v2/everything?q=${props.q}&page=${page}&pgeSize=20&language=${props.language}&apiKey=5a3e68109eb348948c4c14b6d065c70a`)
    var result = await response.json()
    setarticals(articles.concat(result.articles))
  }
  useEffect(() => {
    getAPIData()
  }, [props])
  return (
    <>
      <div className="container-fluid mt-1">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={
            <div className='my-5 text-center'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className="row">
            <h5 className='background text-light text-center p-2 '>{props.q}News Section</h5>
            {
               articles.map((itme, index) => {
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

