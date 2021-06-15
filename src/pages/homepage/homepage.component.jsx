import React from 'react'

import PricesTable from '../../components/prices-table/prices-table.component'

import './homepage.styles.scss'

/*

  Sve symbol vrednosti mozemo naci ovde
  (https://api-pub.bitfinex.com/v2/conf/pub:list:currency) (?)

*/

const HomePage = () => {
  return (
    <div className='homepage'>
      <PricesTable data={['BTCUSD','BTCEUR', 'ETHUSD', 'ETHEUR', 'EOSUSD']} />
      {/* <PricesTable data={['QTMUSD', 'ICEUSD', 'DOTUSD']} /> */}
      {/* <div style={{maxWidth: '340px'}}>
        <PricesTable data={['QTMUSD', 'ICEUSD', 'DOTUSD']} />
      </div> */}

      {/* Primer reusable tabele iznad */}
    </div>
  )
}

export default HomePage
