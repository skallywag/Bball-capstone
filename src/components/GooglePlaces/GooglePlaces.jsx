import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { GOOGLE_API_KEY } from "../../keys/keys";

const GooglePlaces = () => {
  return (
    <div>
      <GooglePlacesAutocomplete GOOGLE_API_KEY />
    </div>
  );
};

export default GooglePlaces;
