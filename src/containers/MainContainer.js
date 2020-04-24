import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    purchasedStocks: [],
    filter: "",
    sort:{
      alphabetically: null,
      price: null
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(r=>r.json())
    .then(stocks => this.setState({ stocks: stocks}))
  }

  onClickPurchase = (e) =>{
    let stockID = parseInt(e.target.id)
    let stockFound = this.state.stocks.find(stock => stock.id === stockID)
    this.setState((prevState)=>({
      purchasedStocks: [...prevState.purchasedStocks, stockFound]
    }))
  }

  stockPurchaseFilter = () =>{
    let stocks = [...this.state.stocks]

    if(this.state.purchasedStocks.length){
      stocks = stocks.filter(stocks =>{
        return !this.state.purchasedStocks.includes(stocks)
      })
    }

    if(this.state.filter){
      stocks = stocks.filter(stocks => {
        return stocks.type === this.state.filter
      })
    }

    if(this.state.sort.price){
      stocks = stocks.sort((stock1,stock2) => stock1.price-stock2.price)
    }

    if(this.state.sort.alphabetically){
      stocks = stocks.sort((stock1,stock2) => {
          return (stock1.name).localeCompare(stock2.name)
      })
    }

    
    return stocks
  }

  onClickSell = (e) =>{
    let stockID = parseInt(e.target.id)

    let portfolio = [...this.state.purchasedStocks]  
    portfolio = portfolio.filter(stocks => {
      return stocks.id !== stockID
    })

    this.setState({
      purchasedStocks: portfolio
    })
  }
  

 stockSoldFilter = () =>{
    let stocks = [...this.state.purchasedStocks]

    return stocks
  }


  onClickFilter = (e) =>{
    this.setState({
      filter: e.target.value
    })
  }

  onClickSort = (e) =>{

    let x = {...this.state.sort}

    x[e.target.value.toLowerCase()] = !x[e.target.value.toLowerCase()]

    this.setState({
      sort: x
    })
    
    


  }



  render() {
    return (
      <div>
        <SearchBar filter = {this.onClickFilter} sort = {this.onClickSort} />
          <div className="row">
            <div className="col-8">
              <StockContainer stocks = {this.stockPurchaseFilter()} onClick = {this.onClickPurchase} purchasedStocks = {this.state.purchasedStocks} />
            </div>
            <div className="col-4">

              <PortfolioContainer purchased = {this.stockSoldFilter()} onClick = {this.onClickSell}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
