import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const Maps = () => {
  return (
  <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
  )
}
export default Maps
export default GoogleApiWrapper({
  apiKey: 'TOKEN HERE'
})(MapContainer);