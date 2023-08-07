import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updatenews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f107f21757af4aa3a7f3fd5481284e68&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updatenews();
  }

  handleprevclick = async () => {
    console.log("prev");
    this.setState({
      page: this.state.page - 1,
    });
    this.updatenews();
  };

  handlenextclick = async () => {
    console.log("next");
    this.setState({
      page: this.state.page + 1,
    });
    this.updatenews();
  };

  render() {
    return (
      <div className="container my-3">

        <h1 className="text-center" style={{marginTop: "72px"}}>NEWS APP - TOP HEADLINES</h1>

        {this.state.loading && <Spinner />}

        <div className="row ">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
