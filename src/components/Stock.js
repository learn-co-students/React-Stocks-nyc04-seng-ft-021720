import React from 'react'


const Stock = (props) => (

  <div >
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" id = {props.stock.id} onClick={props.onClick}>{
            props.stock.name  
          }</h5>
        <p className="card-text">{
          props.stock.ticker + ' ' + props.stock.price 
          }</p>
          <p>
          </p>
      </div>
    </div>
  </div>

);

export default Stock

// style={{display: props.purchased.find(props.stock)? 'none' : 'block'}}