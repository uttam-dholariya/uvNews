import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export default class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    
    }
    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=666e6af2a59042eaa3724acc4012ec62&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({articles : parseData.articles, 
            totalResults:parseData.totalResults,
            loading: false
        })
    }
    handlePrevClick = async ()=>{
        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=666e6af2a59042eaa3724acc4012ec62&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        console.log("p");
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
        console.log("p");
    }
    handleNextClick = async() =>{
        if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){

        let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=666e6af2a59042eaa3724acc4012ec62&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })
        }
    }
    render() {
        return (
            <>
                <div className='container my-3' >
                    <h1>uvNews - Top Headlines</h1>
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                           return<div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}  newsUrl={element.url}/>
                            </div>

                        })}

                    </div>
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark"onClick={this.handlePrevClick}>&lArr; Previous</button>
                    <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rArr;</button>
                    </div>
                </div>


            </>
        )
    }
}
