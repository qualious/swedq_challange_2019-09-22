import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Vehicle from "./Vehicle";

const Map = ({ vehicles, zoom, center, styles }) => (
  <MapContainer>
    <GoogleMapReact
      // Putting this to .env file doesn't prevent anything in prod,
      // it's actually still visible in client site.
      // This is just for demonstrating purposes.
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
      options={{
        disableDefaultUI: true,
        draggable: true,
        keyboardShortcuts: false,
        scaleControl: true,
        scrollwheel: true,
        styles,
      }}
    >
      {vehicles.map(vehicle => (
        <Vehicle
          key={vehicle.id}
          data={vehicle}
          lat={vehicle.payload.lat}
          lng={vehicle.payload.lng}
        />
      ))}
    </GoogleMapReact>
  </MapContainer>
);

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

Map.propTypes = {
  vehicles: PropTypes.array,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  styles: PropTypes.array,
};

Map.defaultProps = {
  center: {
    lat: 50,
    lng: 10,
  },
  zoom: 0,
};

export default memo(Map);
