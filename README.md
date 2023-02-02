# Dartboard

Live demo here: https://dartboard-react.herokuapp.com/

## Description

Dartboard is a web app built in React, intended to spark adventure and inspire movement.
When the user "throws a dart" at the map, Darboard randomly drops a pin within a set distance 
of their current location. A QR code is generated to begin navigation to the pin when scanned with a mobile device,
or links to the pin in Google Maps and Street View are available if already on mobile (or simply to 
check the spot out in more detail). 

This is a simple utility for the intrepid and/or indecisive explorer; let Dartboard pick your next skate spot, date night, or
road trip destination for you.

## Technologies Used

- React
- QR code generation (qrcode.react) 
- Google Maps API (google-map-react)
- Google Street View
- User location

## Stretch goals

- Option to have Dartboard select a random point of interest nearby using the Google Places API. 
- Option to choose a location on the map instead of using the user's location
- Option for infinite distance (locGenerator would need updates since the math for coordinates gets weird around the poles)
- Option to filter out oceans
