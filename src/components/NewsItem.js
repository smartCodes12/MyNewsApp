import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date} = this.props;
    return (
      <div className='container my-3'>
        <div className="card">
  <img src={!imgUrl?"https://images.wsj.net/im-819689/social":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on  {new Date(date).toGMTString()}</small></p>

    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">READ MORE</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem

