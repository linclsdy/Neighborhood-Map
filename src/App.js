import React from 'react'
import './App.css'
import escapeRegExp from 'escape-string-regexp'
import MapContainer from './components/MapContainer.js'
import LocationList from './components/LocationList.js'
import Locations from './data/Locations.json'
import * as FoursquareAPI from './utils/FoursquareAPI.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationListVisible: window.innerWidth > 500 ? true : window.innerWidth < 500 ? false : null,
      locations: Locations,
      locationList: Locations,
      query: '',
      showingInfoWindow: false,
      activeMarker: null,
      name: '',
      address: '',
      photoURL: '',
    }
    this.updateQuery = this.updateQuery.bind(this)
    this.onLocationClicked = this.onLocationClicked.bind(this)
    this.toggleLocationLiist = this.toggleLocationLiist.bind(this)
    this.updateWindowResize = this.updateWindowResize.bind(this)
  }


  componentDidMount() {
    this.updateWindowResize()
  }

  updateWindowResize() {
    let self = this
    window.addEventListener('resize', function(event) {
      if (window.innerWidth < 500) {
        self.setState({ locationListVisible: false })
      }
      else {
        self.setState({ locationListVisible: true })
      }
    });
  }

  updateQuery(query, infowindow) {
    let locationList = this.state.locationList
    let locations = this.state.locations

    this.resetMarker()
    this.setState({ query })

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      locationList = locations.filter(location => match.test(location.name))
    } 
    else { locationList = locations }
    this.setState({ locationList })
  }

  onLocationClicked(location) {
    document.querySelector(`[title="${location.name}"]`).click()
  }

  toggleLocationLiist() {
    this.setState(prevState => ({
      locationListVisible: !prevState.locationListVisible
    }));
  }

  onMarkerClicked = (props, activeMarker, e) => {
    if(props) {
      FoursquareAPI.getFoursquareData(props).then((data) => {
          if(data) {
          this.setState({ 
            showingInfoWindow: true,
            activeMarker: activeMarker,
            name: data.name,
            address: data.address,
            photoURL: data.photoURL 
          })
        }
      })
    }
  }

  resetMarker () {
    this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        name: '',
        address: '',
        photoURL: '' 
    })
  }
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.resetMarker()
    }
  }

  onInfoWindowClosed = (props) => {
    if (this.state.showingInfoWindow) {
      this.resetMarker()
    }
  }

  render() {
    return (
      <main className="App" role="main" >
        <div className="map">
          <MapContainer
            //google={this.props.google}
            locations={this.state.locationList}
            onMapClicked={this.onMapClicked}
            onMarkerClicked={this.onMarkerClicked}
            onInfoWindowClosed={this.onInfoWindowClosed}
            activeMarker={this.state.activeMarker}
            name={this.state.name}
            address = {this.state.address}
            photoURL = {this.state.photoURL}
            visible={this.state.showingInfoWindow}
          />
        </div>
        <section className="menu" >
          <header className="header" aria-label="Application Header">
            <h2>Art Galleries in Germany</h2>
            <button id="toggleLocationButton" title="Toggle Location List" type='button' onClick={this.toggleLocationLiist}>
            {!this.state.locationListVisible ? 'show' : 'hide'}</button>
          </header>
          {this.state.locationListVisible ?
            <LocationList
              locations={this.state.locations}
              locationList={this.state.locationList}
              onLocationClicked={this.onLocationClicked}
              updateQuery={this.updateQuery}
              query={this.state.query}
              markers={this.state.markers}
              locationListVisible={this.state.locationListVisible}
            /> : null}
        </section>
      </main>
    );
  }
}

export default App

