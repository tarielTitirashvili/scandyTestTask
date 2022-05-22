import React from 'react';
import {
  Navigate, Route, Routes
} from 'react-router-dom';
import Category from '../../pages/category';
import styled from 'styled-components'
import Header from '../../ui/organisms/header';
import { GET_CATEGORIES, GET_CURRENCIES } from '../../../graphQL/query';
import { client } from './../../../';
import Product from '../../pages/product';
import Cart from '../../pages/cart';

const AppContainer = styled.div`
padding: 0 101px 0 101px;
width: calc(100vw-202px);
`
export class MainLayout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      currency: {},
      currencies: [],
      categories: [],
    }
    this.onClick=this.onClick.bind(this)
    this.onChangeCurrency = this.onChangeCurrency.bind(this)
  }
  onClick(name){
    this.setState(({
      name: name
    }))
  }
  onChangeCurrency(newCurrency){
    this.setState(({
      currency: newCurrency
    }))
  }
  getDate = async () => {
    const {data} = await client.query({
      query: GET_CATEGORIES
    })
    this.setState((
      {
        name: data.categories[0].name,
        categories: data.categories
      }
    ))
  }

  getCurrencies = async()=>{
    const {data} = await client.query({
      query: GET_CURRENCIES
    })
    this.setState(({
      currencies: data.currencies,
      currency: data.currencies[0],
    }))
  }
  componentDidMount(){
    this.getDate()
    this.getCurrencies()
  }
  render(){
    // console.log(window.history)
    // console.log(window.location.search)
    return(
      <AppContainer>
        <Header 
          onChangeCurrency = {this.onChangeCurrency}
          name = { this.state.name } 
          categories = { this.state.categories } 
          onClick = { this.onClick }
          currencies = {this.state.currencies}
          currency = {this.state.currency}
        />
        <Routes>
          <Route 
            path='/category/:name' 
            element = {<Category name={this.state.name} currency={this.state.currency} />} 
          />
          <Route 
            path='/product/:id' 
            element = {<Product name={this.state.name} currency={this.state.currency}/>} 
          />
          <Route 
            path='/cart' 
            element = {<Cart name={this.state.name} currency={this.state.currency} />} 
          />
          <Route path='/' element = { <Navigate replace to={`/category${'/'+this.state.name}`} /> } />
          <Route path='*' element = { <Navigate replace to='/error404' /> } />
        </Routes>
      </AppContainer>
    )
  }
}