import React, { useState } from "react";
import GoogleMapReact from "google-map-react";



export default function StyledMap(props) {
    const defaultProps = {
        center: {
            lat: 45,
            lng: -122
        },
        zoom: 13
    };


    const Marker = ({ text }) =>
        <div>
            <img className='pin fadein' src="pin.png"></img>
            <div className="row-center fadein">
                <h4 className='coords'>{Math.floor(props.options.pinLoc[0] * 1000000) / 1000000}º</h4>
                <h4 className='coords'>,</h4>
                <h4 className='coords'>{Math.floor(props.options.pinLoc[1] * 1000000) / 1000000}º</h4>
            </div>
        </div>;

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                // defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                center={{
                    lat: (props.options.distance == 0) ? props.userLocation.latitude : props.options.pinLoc[0],
                    lng: (props.options.distance == 0) ? props.userLocation.longitude : props.options.pinLoc[1]
                }}
                defaultCenter={defaultProps.center}
                options={{ styles: mapStyle }}

            >
                {props.options.distance != 0 &&
                    <Marker
                        lat={(props.options.distance == 0) ? props.userLocation.latitude : props.options.pinLoc[0]}
                        lng={(props.options.distance == 0) ? props.userLocation.longitude : props.options.pinLoc[1]}
                        text={`${Math.floor(props.options.pinLoc[0] * 1000000) / 1000000}º, ${Math.floor(props.options.pinLoc[1] * 1000000) / 1000000}º`}
                        className="marker fadein"
                    />
                }

            </GoogleMapReact>
        </div>
    );
}

function Marker() {
    return <div className="marker"></div>
}

const mapStyle = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#202c3e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#29446b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#193a55"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
]
