import React from 'react'

import './prices-item.styles.scss'

/*

  Izvuceno iz BITFINEX API DOCS (https://docs.bitfinex.com/reference#rest-public-tickers)
  on trading pairs (ex. tBTCUSD)
  [
    BID, 
    BID_SIZE, 
    ASK, 
    ASK_SIZE, 
    DAILY_CHANGE, 
    DAILY_CHANGE_RELATIVE, 
    LAST_PRICE, 
    VOLUME, 
    HIGH, 
    LOW
  ]

  Proces rada komponente:
    1. Komponenta se mountuje i otvara WebSocket 
        sa parametrima
            event: 'subscribe', 
            channel: 'ticker', 
            symbol: this.state.symbol
    2. Prikuplja podatke i updatuje DOM na svakom
        snapshotu
    3. Pri unmountovanju komponente zatvaramo sockete

*/


class PricesItem extends React.Component{
  constructor(props){
    super(props)
    
    this._isMounted = false;

    this.state = {
      symbol: this.props.symbol,
      dailyChange: '/',
      volume: '/',
      lastPrice: '/',
      didPriceUpdate: false,
      flash: false
    }
  }
  handleSockets = (type) => {
    var socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    let data;

    switch(type){
      case 'open':
        {
          socket.onmessage = (async (msg) => {
            let msgJSON = []
            msgJSON = await JSON.parse(msg.data)
      
            // Ovde proveravamo da li smo uspeli da parsujemo JSON koji nam
            // socket daje, ukoliko jesmo uzimamo 1. element iz niza koji dobijamo
            // jer je element 0 = SymbolID. Proveravamo da li je podatak ustvari informacija
            // a ne HeartBeat. Ukoliko je komponenta i dalje mountovana, podesavamo state.
            // Ukoliko ne bismo imali _isMounted, moze doci do memory leak-a.
            if(msgJSON.length && msgJSON[1] !== 'hb' && this._isMounted){
              data = msgJSON.pop()
      
              this.setState({
                dailyChange: `${Math.round(data[5] * 10000) / 100}%`,
                volume: Math.round(data[7] * 100) / 100,
                lastPrice: Math.round(data[6] * 100) / 100,
                didPriceUpdate: true,
                flash: true
              }, () => {
                setTimeout(() => this.setState({flash: false}), 1000)
              })
              
            }
          })
      
          let msg = JSON.stringify({ 
            event: 'subscribe', 
            channel: 'ticker', 
            symbol: this.state.symbol
          })
      
          socket.onopen = function(){
            socket.send(msg)
          }

          socket.onerror= function(e){
            console.log(e)
          }
        }
        break;

        case 'close':
          socket.close()
          break;

        default: return;
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.handleSockets('open');
  }

  componentWillUnmount(){
    this._isMounted = false;
    this.handleSockets('close')
    console.log('Closing sockets');
  }

  render(){
    return (
      <div className={`prices-item-table
      ${ this.state.didPriceUpdate ? 'price-update' : ''}
      ${ this.state.flash ? 'price-flash' : ''}`}>
            <p><strong>{this.props.id}</strong></p>
            <p>{this.state.symbol}</p>
            <p>{this.state.dailyChange}</p>
            <p>{this.state.volume}</p>
            <p>{this.state.lastPrice}</p>
      </div>
    )
  }
}

export default PricesItem
