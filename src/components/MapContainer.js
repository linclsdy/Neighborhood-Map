import React, { Component } from 'react'
import '../App.css'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import icon from '../img/icon.png'

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: {}
    }
  }

 componentDidMount() {
  this.updateBounds()
 }

   updateBounds() {
      var bounds = new this.props.google.maps.LatLngBounds();
      for (var i = 0; i < this.props.locations.length; i++) {
        bounds.extend(this.props.locations[i].position);
      }
      this.setState({bounds: bounds})
    }
  
  render() {
    const {google, locations, onMapClicked, onInfoWindowClosed, onMarkerClicked, activeMarker, name, address, photoURL, visible } = this.props

    return (
      <Map
        google = {google}
        style = {this.style}
        initialCenter = {{
          lat: 52.520008,
          lng: 13.404954
        }}
        bounds = {this.state.bounds}
        zoom = {14}
        onClick = {onMapClicked}
        tabIndex = "0"
      >
        {locations.map((location, index) => (
          <Marker
            id = {index}
            name = {location.name}
            title = {location.name}
            position = {location.position}
            onClick = {onMarkerClicked}
            key = {location.name}
            icon = {icon}
            //animation={activeMarker ? this.props.google.maps.Animation.BOUNCE : null  }
          />
        ))}
        <InfoWindow
          marker = {activeMarker}
          onClose = {onInfoWindowClosed}
          visible = {visible}
        >
        <div>
          <h2>{name}</h2>
          <img src={photoURL || "Sorry No Image"} alt="location"/>
          <h3>{address[0]}</h3> <h4>{address[1]}</h4> <h4>{address[2]}</h4>
        </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAQF9ZueiX06ah5l2KTylOV45HdTGl07bk"
})(MapContainer);