import React, { Component } from 'react';
import FlexContainer from '../../styles/flexContainer';
import CartImagePlayer from '../cartImagePlayer';
import { SmallTitle, Text } from './../../styles/titles/index';
import Attributes from './../attributes/index';
import DropdownProductQuantity from './../DropdownProductQuantity/index';
import { NavLink } from 'react-router-dom';

export default class CartProduct extends Component {
  render() {
    return (
      <FlexContainer 
        justify = {'space-between'} 
        margin = {'24px 0'} 
      >
      <div style={{width: '320px'}}>
        <NavLink to={`/product/${this.props.product.product.id}`}>
          <SmallTitle 
            weight={'600'} 
            size={'1.875rem'} 
            lineHeight={'27px'} 
            margin={'0 0 16px 0'} 
            cursor = {'pointer'}
          >
            {this.props.product.product.brand}
          </SmallTitle>
        </NavLink>
        <NavLink to={`/product/${this.props.product.product.id}`}>
          <SmallTitle 
            size={'1.875rem'} 
            cursor={'pointer'} 
            weight={'400'} 
            margin={'0'}
          >
            {this.props.product.product.name}
          </SmallTitle>
        </NavLink>
        <Text 
          size ={'1.5rem'} 
          cursor={'text'} 
          weight={'700'}
          margin={'4px 0 8px 0'}
        >
          {this.props.currency}
          {this.props.product.product.prices.map(price=>{
            return price.currency.symbol===this.props.currency?price.amount:''
          })}
        </Text>
        {
          this.props.product.product.attributes.map(attribute=>{
            return<Attributes 
              key={attribute.id} 
              attribute = {attribute} 
              selected={this.props.product.selectedAtr} 
              pushSelectedAtr={this.props.pushSelectedAtr}
              index = {this.props.index}
              setNewAttributeSelected={this.props.setNewAttributeSelected}
            />
          })
        }
      </div>
      <FlexContainer zIndex={'0'}>
        <DropdownProductQuantity 
          onCartStateChange = {this.props.onCartStateChange}
          onChangeCount = {this.props.onChangeCount} 
          index = {this.props.index} 
          quantity = {this.props.product.quantity}
        />
        <CartImagePlayer 
          name={this.props.product.product.name} 
          gallery={this.props.product.product.gallery}
        />
      </FlexContainer>
    </FlexContainer>
    );
  };
};
