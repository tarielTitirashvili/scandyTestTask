import React, { Component } from 'react'
import styled from 'styled-components'
import EmptyCart from '../../../../../assets/EmptyCart.svg'
import DropdownCart from '../../DropdownCart'

const CartCount = styled.p`
position: absolute;
top: -10px;
right: -10px;
height: 20px;
width: 20px;
display: flex;
align-items: center;
justify-content: center;
background: ${props=>props.background || props.theme.colors.text};
color: ${props=>props.color || props.theme.colors.white};
font-weight: 700;
font-size: 0.875rem;
border-radius: 100%;
`
const CartButtonCOntainer = styled.div`
position: relative;
cursor: pointer;
`
const CartDropdownContainer = styled.div`
position: absolute;
padding: 32px 16px;
right: 72px;
width: 325px;
max-height: 677px;
overflow: auto;
background-color:${props=>props.color || props.theme.colors.white};
`
const ScreenDarker = styled.div`
position: absolute;
top: 52px;
right: -101px;
width: 100vw;
height: ${props=> props.height+'px' || 'calc(100vh - 80px)'};
background-color: #39374838;
`

export default class Cart extends Component {
  constructor(props){
    super(props)
    this.state={
      quantity: 0,
      products: []
    }
  }
  onAtrSelect=(name, value, selected, index)=>{
    let cliCkedProductId = this.state.products[index].product.id
    let filteredSelectedAtr = undefined
    let isProductWithSameParams = false
    let product = {
      product: this.state.products[index].product,
      quantity: this.state.products[index].quantity,
      selectedAtr: [...this.state.products[index].selectedAtr]
    }
    if(selected.length!==0){
      filteredSelectedAtr = product.selectedAtr.filter(selected=>selected.name!==name)
      product.selectedAtr=filteredSelectedAtr
    }
    let filteredProducts = this.state.products.filter((product, i)=>i!==index)
    product.selectedAtr.push({name: name, value: value})
    filteredProducts.forEach(randomProduct=>{
      if(randomProduct.product.id===cliCkedProductId){
        let sameValues = 0
        randomProduct.selectedAtr.forEach(attribute=>{
          product.selectedAtr.forEach(atr=>{
            if(attribute.name === atr.name && attribute.value===atr.value ){
              sameValues=sameValues+1
            }
          })
        })
        if(sameValues===product.selectedAtr.length){
          isProductWithSameParams = true
        }
      }
    })
    filteredProducts.splice(index, 0, product)
    if(!isProductWithSameParams){
      this.setState(({
        products: [ ...filteredProducts]
      }))
    }
  }
  onChangeCount=(change, index)=>{
    let filteredProducts = this.state.products.filter((product, i)=>i!==index)
    let product = {
      product: this.state.products[index].product,
      quantity: this.state.products[index].quantity,
      selectedAtr: [...this.state.products[index].selectedAtr]
    }
    product.quantity = product.quantity+change
    if(product.quantity>0){
      filteredProducts.splice(index, 0, product)
      this.setState(prev=>({
        products: [...filteredProducts],
        quantity: prev.quantity+change
      }))
    }else{
      this.setState(prev=>({
        products: [...filteredProducts],
        quantity: prev.quantity+change
      }))
      localStorage.setItem('cart', JSON.stringify([...filteredProducts]))
    }
  }
  componentDidUpdate(prevProps){
    let cart = JSON.parse(localStorage.getItem('cart'))
    if(prevProps.cartChanged!==this.props.cartChanged){
      if(cart){
        this.setState(({
          quantity: cart.length
        }))
      }
    }
    if(this.props.cartOpen){
      if(cart){
        if(this.state.products.length !== cart.length){
          this.state.products.forEach(product=>product.count)
          this.setState(({
            products: cart
          }))
        }
      }
    }
    if(prevProps.cartOpen&&!this.props.cartOpen){
      localStorage.setItem('cart', JSON.stringify([...this.state.products]))
    }
  }
  componentDidMount(){
    let cart = JSON.parse(localStorage.getItem('cart'))
    if(cart){
      let quantity = 0
      cart.forEach(product=>{
        quantity = quantity + product.quantity
      })
      this.setState(({
        quantity: quantity
      }))
    }
  }
  generateHight=()=>{
    let winHeight = window.innerHeight
    let rootDivHeight = document.getElementById("root").clientHeight
    if(winHeight<rootDivHeight){
      return rootDivHeight - 80
    }else{
      return winHeight - 80
    }
  }
  render() {
    console.log(this.state.products)
    return (
      <CartButtonCOntainer 
        onClick={this.props.onCartButtonClick}
      > 
        {
          this.state.quantity>0?
          <CartCount>
            {this.state.quantity}
          </CartCount>
          :''
        }     
        <img src={EmptyCart} alt = 'EmptyCart' />
        {
          this.props.cartOpen?
          <ScreenDarker height = {this.generateHight()}>
            <CartDropdownContainer>
              <DropdownCart 
                quantity = {this.state.quantity}
                onChangeCount = {this.onChangeCount}
                onAtrSelect = {this.onAtrSelect}
                currency = {this.props.currency} 
                products = {this.state.products} 
              />
            </CartDropdownContainer>
          </ScreenDarker>
          :''
        }
      </CartButtonCOntainer>
    )
  }
}
