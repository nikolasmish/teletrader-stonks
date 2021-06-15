import React from 'react'
import PricesItem from '../prices-item/prices-item.component'

import './prices-table.styles.scss'

/*

  Predstavlja main container za prikaz trenutnih cena.
  Odradjeno je pomocu display: grid, moglo je i putem
  tabele ali mi se ipak ovako vise svidjalo zbog
  fleksibilnosti grid-a (responsive design).

  Props: data(Arr[]) 
            => data = ['symbol1', 'symbol2', ..., 'symbolN']
  
*/

const PricesTable = ({data = []}) => {

    return (
      <div className='prices-table'>
        <div className="prices-table-wrapper">
          <h4>#</h4>
          <h4>Symbol</h4>
          <h4>Daily Change</h4>
          <h4>Volume</h4>
          <h4>Last Price</h4>
        </div>
        {
          data.map((item,id) => {
            return <PricesItem key={id} symbol={item} id={id+1} />
          })
        }
      </div>
    )
  
}

export default PricesTable
