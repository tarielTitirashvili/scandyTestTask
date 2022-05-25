import React, { Component } from 'react'
import styled from 'styled-components';
import FlexContainer from '../../styles/flexContainer';


const GalleryImage = styled.img`
width: 140px;
height:87px;
object-fit: cover;
margin-bottom: 32.4px;
`
const GalleryContainer = styled(FlexContainer)`
overflow: ${props=>props.overflow || 'hidden'};
`

export default class FullGallery extends Component {

  render() {
    return (
      <GalleryContainer width={'160px'} height={'511px'} overflow={'auto'}>
        {
          this.props.gallery.map((photo)=>{
            return <GalleryImage key={photo} onClick={()=>this.props.setSelectedImage(photo)} src={photo} alt="gallery"/>
          })
        }
      </GalleryContainer>
    )
  }
}