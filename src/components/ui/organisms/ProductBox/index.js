import React, { Component } from 'react'
import FlexContainer from '../../styles/flexContainer'
import { Text } from '../../styles/titles'
import { NavLink } from 'react-router-dom';

export default class ProductBox extends Component {
  render() {
    return (
      <NavLink to={`/product/${this.props.product.id}`} style={{padding:'16px', cursor: 'pointer'}}>
        <FlexContainer 
          display={'block'} 
          justify={'left'} 
          height={'330px'}
        >
          <img 
            src={this.props.product.gallery[0]} 
            alt={this.props.product.name}
            style={{width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer'}}
          />
        </FlexContainer>
        <Text 
          weight={'300'} 
          fontSize={'1.125rem'} 
          margin={'24px 0 0 0'}
        >
          {this.props.product.name}
        </Text>
        {
          this.props.product.prices.map((currency)=>{
            if(this.props.currency.label===currency.currency.label&&
              this.props.currency.symbol===currency.currency.symbol
              ){
            return<Text 
              key={currency.currency.symbol} 
              weight={'500'} 
              fontSize={'1.125rem'} 
              margin={'0 0 16px 0'}
            >
            {`${currency.currency.symbol} ${currency.amount}`}
            </Text>
            }
          })
        }
      </NavLink>
    )
  }
}