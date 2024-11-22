import React, { useEffect, useState } from 'react';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  InputAdornment ,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Index = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [storeType, setStoreType] = useState('All');
  const [storeType1, setStoreType1] = useState('All');
  const [streetName, setStreetName] = useState('All');
  const [area, setArea] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCoordinates, setFilteredCoordinates] = useState([]);

  useEffect(() => {
    // Fetch your JSON data
    fetch('/data/cel.json')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          caseId: item['Case ID'],
          email: item['Email'] || 'No Email Provided',
          phone: item['Phone'] || 'No Phone Provided',
          lastConnectionDate: item['Last connection date'] || 'No Connection Date',
          connectionDuration: item['Duration of connection in minutes'] || 0,
          connections: item['Number of connections'] || 0,
          shopName: item[' - Name of the shop (Address):'] || 'Unknown Shop Name',
          shopAddress: item[' - Shop number (Address):'] || 'No Shop Address Provided',
          streetName: item[' - Street Name\u00a0(Address):'] || 'No Street Name',
          locality: item[' - Area / Locality:'] || 'No Locality',
          town: item[' - Town :'] || 'No Town',
          landmark: item[' - Landmark:'] || 'No Landmark',
          geoLocation: item['Geo Location'] || 'No Geo Location',
          googleCoordinate: item['Google_Coordinate'] || { latitude: null, longitude: null },
          areaEngineer: item['Area Engineer'] || 'Unknown Engineer',
          district: item['District'] || 'Unknown District',
          phase: item['Phase'] || 'Unknown Phase',
          connectionDetails: {
            disposition: item['Disposition'] || 'No Disposition',
            deviceOS: item['Device OS'] || 'Unknown OS',
            osVersion: item['Version OS'] || 'Unknown Version',
          },
          shopDetails: {
            areaInSqFoot: item['Area of the shop in sq foot.'] || 0,
            storeType: item['Store type'] || 'Unknown Store Type',
            storeType1: item['Store type.1'] || 'Unknown Store Type',
          },
          color: item['Color Code'] || '#FF0000', // Default color if missing
        }));
        setCoordinates(formattedData);
        setFilteredCoordinates(formattedData); // Initially, show all data
      })
      .catch((error) => console.error('Error fetching coordinates:', error));
  }, []);

  useEffect(() => {
    const filtered = coordinates.filter((item) => {
      const matchStoreType =
        storeType === 'All' || item.shopDetails.storeType === storeType;
      const matchStoreType1 =
        storeType1 === 'All' || item.shopDetails.storeType1 === storeType1;
      const matchStreetName =
        streetName === 'All' || item.streetName === streetName;
      const matchArea =
        area === 'All' || item.locality === area;
      const matchSearch =
        searchQuery === '' ||
        item.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shopAddress.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStoreType && matchStoreType1 && matchStreetName && matchArea && matchSearch;
    });

    setFilteredCoordinates(filtered);
  }, [storeType, storeType1, searchQuery, coordinates]);

  const storeTypes = [
    { label: 'All', value: 'All' },
    { label: 'Battery Shop', value: 'Battery Shop' },
    { label: 'Car Wash Center', value: 'Car wash center' },
    { label: 'Filling Station/Shade', value: 'Filling station/ shade' },
    { label: 'High Street Oil Shop (HOS)', value: 'HOS: High street Oil shop (Only Lubricants selling outlet in High street market)' },
    { label: 'Workshop (All Types)', value: 'Independent workshop for any type of vehicle (bike, car, truck, bus, etc.)' },
    { label: 'Bike Workshop (IWS)', value: 'IWS - Bike: Independent workshop - Bike (Bike independent workshops - who are doing Lubricant oil change in their premises)' },
    { label: 'Car Workshop (IWS)', value: 'IWS - Car: Independent workshop - Car (Car independent workshops - who are doing Lubricant oil change in their premises)' },
    { label: 'Truck/Bus Workshop (IWS)', value: 'IWS - Truck/Bus: Independent workshop - Truck/Bus (Truck/Bus independent workshops - who are doing Lubricant oil change)' },
    { label: 'Others', value: 'Others, please specify:' },
    { label: 'Retail Shop', value: 'Retail shop' },
    { label: 'Spare Parts Shop (SPS)', value: 'SPS: Spare parts Shop (Lubricants selling outlet in high street market with Spare Parts Sales)' },
    { label: 'Three Wheeler Repair Center', value: 'Three wheeler repair centre' },
    { label: 'Tyre Shop', value: 'Tyre Shop' },
  ];

  return (
    <div>
      <Typography
        variant="h6"
        gutterBottom
        fontWeight="bold"
        style={{ fontSize: '1.5rem' }}
        marginBottom={4}
      >
        Projects Map View
      </Typography>

      <Grid container spacing={3} justifyContent="center">
      {/* Search Field */}
      {/* Search Field with Search Icon */}
      <Grid item xs={12} md={8}>
        <TextField
          label="Search by Shop Name or Address"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Filter Fields */}
      <Grid container item xs={12} spacing={3}>
        {/* Store Type Select */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth style={{ minWidth: '220px', marginBottom: '20px' }}>
          <Typography style={{ fontSize: '14px' }}>Store Size</Typography>
            <Select
              value={storeType}
              onChange={(event) => setStoreType(event.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Less than 150">Less than 150</MenuItem>
              <MenuItem value="150-500">150-500</MenuItem>
              <MenuItem value="501-1000">501-1000</MenuItem>
              <MenuItem value="1001-1500">1001-1500</MenuItem>
              <MenuItem value="1501-2000">1501-2000</MenuItem>
              <MenuItem value="2001-2500">2001-2500</MenuItem>
              <MenuItem value="2501-3000">2501-3000</MenuItem>
              <MenuItem value="More than 3000">More than 3000</MenuItem>
            </Select>
          </FormControl>
        </Grid>



        {/* Store Type 1 Select */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <Typography style={{ fontSize: '14px' }}>Store Type</Typography>
            <Select value={storeType1} onChange={(event) => setStoreType1(event.target.value)}>
              {storeTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Filter Field 1 */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <Typography style={{ fontSize: '14px' }}>Street Name</Typography>
            <Select value={streetName} onChange={(event) => setStreetName(event.target.value)}>
              {/* Extract unique street names from the coordinates data */}
              {Array.from(new Set(coordinates.map(item => item.streetName)))
                .map((street, index) => (
                  <MenuItem key={index} value={street}>
                    {street || 'No Street Name'}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Filter Field 2 */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <Typography style={{ fontSize: '14px' }}>Area</Typography>
          <Select value={area} onChange={(event) => setArea(event.target.value)}>
              {/* Extract unique street names from the coordinates data */}
              {Array.from(new Set(coordinates.map(item => item.locality)))
                .map((street, index) => (
                  <MenuItem key={index} value={street}>
                    {street || 'No Area Name'}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

      </Grid>
    </Grid>

      {filteredCoordinates.length > 0 ? (
        <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <GoogleMap coordinates={filteredCoordinates} />
        </div>
      ) : (
        <Typography
          variant="h6"
          style={{ marginTop: '20px', textAlign: 'center', color: 'gray' }}
        >
          No locations found for the selected filters or search query.
        </Typography>
      )}
    </div>
  );
};

const GoogleMap = ({ coordinates }) => {
  useEffect(() => {
    if (!coordinates.length) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDBGsVAoOe1KIgNYr6d3bIHgnn_SRmzLTw&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [coordinates]);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: 7.85874, lng: 81.10807 },
    });

    const infoWindow = new window.google.maps.InfoWindow();

    const storeTypeIcons = {
      'Battery Shop': 'icon/battery.png',
      'Car Wash Center': 'icons/workshop.png',
      'Filling station/ shade': 'icon/fuel.png',
      'HOS: High street Oil shop (Only Lubricants selling outlet in High street market)': 'icon/store.png',
      'Independent workshop for any type of vehicle (bike, car, truck, bus, etc.)': 'icon/repair.png',
      'IWS - Bike: Independent workshop - Bike (Bike independent workshops - who are doing Lubricant oil change in their premises)': 'icon/motorcycle.png',
      'IWS - Car: Independent workshop - Car (Car independent workshops - who are doing Lubricant oil change in their premises)': 'icon/maintaince.png',
      'IWS - Truck/Bus: Independent workshop - Truck/Bus (Truck/Bus independent workshops - who are doing Lubricant oil change)': '/icon/car-service.png',
      'Others, please specify:': '/icon/shop.png',
      'Retail shop': '/icon/shop.png',
      'SPS: Spare parts Shop (Lubricants selling outlet in high street market with Spare Parts Sales)': '/icon/repair-shop.png',
      'Three wheeler repair centre': '/icon/rickshaw.png',
      'Tyre Shop': '/icon/rubber.png',
      default: '/icon/pin.png',
    };

    const markers = coordinates.map((coordinate) => {
      const { googleCoordinate, shopName, shopAddress, email, phone, town, shopDetails } =
        coordinate;
      const { latitude, longitude } = googleCoordinate;

      const storeTypeIcon = storeTypeIcons[shopDetails.storeType1] || storeTypeIcons.default;

      const svgIcon = {
        path: storeTypeIcon,
        fillColor: "#000000",
        fillOpacity: 1,
        scale: 1.8,
        strokeColor: 'white',
        strokeWeight: 1,
      };

    const marker = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      icon: {
        url: storeTypeIcon, // Use the icon image path
        scaledSize: new window.google.maps.Size(60, 60), // Adjust size as needed
      },
    });

      const infoContent = `
        <div class="shop-info">
          <!-- Shop Title and Icon in Same Row -->
          <div class="title-container">
            <!-- Shop Image Icon -->
            <img 
              src="${storeTypeIcon}" 
              alt="${shopDetails.storeType1}" 
              width="24" 
              height="24"
            />

            <!-- Shop Title (Shop Name) -->
            <h3 class="shop-title">${shopName}</h3>
          </div>

          <!-- Shop Details -->
          <h3>Store Type ${shopDetails.storeType1}</h3>
          <p>Address: ${shopAddress}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Town: ${town}</p>
          <p>Store size in square feet: ${shopDetails.storeType}</p>

          <style>
            .title-container {
              display: flex;
              align-items: center;
            }

            .shop-title {
              font-size: 20px;
              margin-left: 8px; /* Space between icon and title */
            }

            svg {
              display: inline-block;
              vertical-align: middle;
            }
          </style>
        </div>
      `;

      marker.addListener('click', () => {
        infoWindow.setContent(infoContent);
        infoWindow.open(map, marker);
      });

      return marker;
    });

    new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    });
  };

  return <div id="map" style={{ height: '100%' }}></div>;
}

export default Index;
