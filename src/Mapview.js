import { Button } from 'react-bootstrap';
import locGenerator from "./locationUtil";
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Options from "./Options";
import { QRCodeSVG } from 'qrcode.react';
import StyledMap from "./StyledMap";

// import { GoogleMap, Marker, useLoadScript, InfoWindow } from 'react-google-maps'

function Mapview() {

    const initOptions = () => {
        return {
            radius: 5,
            metric: false,
            pinLoc: [0, 0],
            distance: 0,
            lastUsedMetric: false
        };
    };

    const initUserLocation = () => {
        return {
            latitude: 0,
            longitude: 0
        };
    };

    const [options, setOptions] = useState(initOptions);
    const [userLocation, setUserLocation] = useState(initUserLocation);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleOptionsMetric = () => {
        console.log("miles toggled")

        if (options.metric) {
            setOptions({
                radius: options.radius,
                metric: false,
                pinLoc: options.pinLoc,
                distance: options.distance,
                lastUsedMetric: options.lastUsedMetric
            });
        }
        else {
            setOptions({
                radius: options.radius,
                metric: true,
                pinLoc: options.pinLoc,
                distance: options.distance,
                lastUsedMetric: options.lastUsedMetric
            });
        }
    }

    const handleRadiusChange = (r) => {
        setOptions({
            radius: r,
            metric: options.metric,
            pinLoc: options.pinLoc,
            distance: options.distance,
            lastUsedMetric: options.lastUsedMetric
        });
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(`User location = Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }

    }, [])

    function throwDart() {
        console.log("throw")
        let copy = locGenerator(options, userLocation);

        setOptions({
            radius: copy.radius,
            metric: copy.metric,
            pinLoc: copy.pinLoc,
            distance: copy.distance,
            lastUsedMetric: copy.lastUsedMetric
        });
    }

    return (


        <div>
            <StyledMap className="map" options={options} userLocation={userLocation}/>
            <div className='Xover-map tooltipBoundary'>
            
                <div className="Xmapview-wrapper ">
                    {/* <div></div> */}
                    
                    {show &&
                        <div className='darken fadein'>
                            <div className='modal'>
                                
                                <div className="modal-content corner-frame-thicc">
                                    <div className="row-space-between">
                                        <span></span>
                                        <button onClick={handleClose} className="close-modal">&times;</button>
                                    </div>

                                    <p className='how-to-banner'>How to use:</p>
                                    <div className="padding-h">

                                        <ul className='list'>
                                            <li>
                                                "<span className="fancy-text"><b>Throw</b></span> a dart" at the map at a random location near you.
                                            </li>
                                            <li>
                                                Use <span className="fancy-text"><b>⚙</b></span> to adjust the max distance the dart can land from you.
                                            </li>
                                            <li>
                                                Scan the generated QR code to begin navigation on mobile.
                                            </li>

                                            <li>
                                                Follow the links to open in Google Maps or Street View.
                                            </li>
                                        </ul>

                                    <button onClick={handleClose} className='btn41-43 btn-42'>Got it</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }

                    <div></div>

                    {options.distance == 0 ?

                        (userLocation.latitude == 0 && userLocation.longitude == 0) &&
                            <div className='darken col'>
                                <div className='col'>
                                    <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                    <p className='mono'>Fetching location...</p>
                                </div>

                            </div>
                        :
                        <>
                        {/* <div className='row-space-between'> */}
                            <div className="dev-stats fadein">
                                {/* <h4 className='corner-frame-small coords'>{Math.floor(options.pinLoc[0] * 1000000) / 1000000}º,  {Math.floor(options.pinLoc[1] * 1000000) / 1000000}º</h4> */}
                                {/* <div className='corner-frame-small'>
                                    <h4 className='coords'>{Math.floor(options.pinLoc[0] * 1000000) / 1000000}º,</h4>
                                    <h4 className='coords'>{Math.floor(options.pinLoc[1] * 1000000) / 1000000}º</h4> 
                                </div> */}

                                <p className='distance-display'><img className="distance-icon" src="icons8-distance-24.png" />{Math.floor(options.distance * 100) / 100} {options.lastUsedMetric ? "km" : "mi"}</p>
                                <QRCodeSVG value={`https://www.google.com/maps/search/?api=1&query=${Math.floor(options.pinLoc[0] * 1000000) / 1000000}%2C${Math.floor(options.pinLoc[1] * 1000000) / 1000000}`} includeMargin={true} size={100} />
                                <p className='small-text'>or open in:</p>


                                <a href={`https://www.google.com/maps/search/?api=1&query=${Math.floor(options.pinLoc[0] * 1000000) / 1000000}%2C${Math.floor(options.pinLoc[1] * 1000000) / 1000000}`}>
                                    <img className="google-link-icon" src="googlemaps.png" ></img>
                                </a>
                                
                                <a href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${(options.pinLoc[0] * 1000000) / 1000000}%2C${(options.pinLoc[1] * 1000000) / 1000000}&heading=-45fov=80`}>
                                    <img className="google-link-icon" src="streetview.png" ></img>
                                </a>
                            </div>
                            {/* <div></div> */}
                            {/* <div></div> */}
                        {/* </div> */}
                        {/* <img className='pin' src="pin.png"></img> */}
                        {/* <h4 className='coords'>{Math.floor(options.pinLoc[0] * 1000000) / 1000000}º, {Math.floor(options.pinLoc[1] * 1000000) / 1000000}º</h4> */}
                        </>
                    }



                    <div className="row-center padding-bottom gradient-opacity sticky">
                        <div className="col"><button onClick={handleShow} className=" clear-button small">ⓘ</button></div>
                        <Button onClick={() => throwDart()} className="bn632-hover bn28 throw-button" variant='light'>Throw</Button>
                        <Popup closeOnDocumentClick keepTooltipInside=".tooltipBoundary" position="top center" trigger={open => (
                            <button className="col clear-button large">⚙</button>)} >
                            <Options radius={options.radius} metric={options.metric} toggleOptionsMetric={toggleOptionsMetric} handleRadiusChange={handleRadiusChange} />
                        </Popup>
                    </div>

                </div>
            </div>

        </div>


    )
}

export default Mapview;




{/* <div className='tootltipBoundary'>
<StyledMap className="map col"/>
<div className="row-center padding-bottom gradient-opacity sticky">
    <div className="col"><button onClick={handleShow} className=" clear-button small">ⓘ</button></div>
    <Button onClick={() => throwDart()} className="bn632-hover bn28 throw-button" variant='light'>Throw</Button>
    <Popup closeOnDocumentClick keepTooltipInside=".tooltipBoundary" position="top center" trigger={open => (
        <button className="col clear-button large"> {open ? '⚙' : '⚙'}</button>)} >
        <Options radius={options.radius} metric={options.metric} toggleOptionsMetric={toggleOptionsMetric} handleRadiusChange={handleRadiusChange} />
    </Popup>
</div>

</div> */}

//-------------------------

































// function enforceSixDecimalPlaces(num) {

//     // if(-100 < num < 10) { // (-)(X)(X)(.) = 4        (-)(2)(3)(4)(.)6789X1
//         num = num.toString();
//         if (num.length < 11) {
//             for(i=5; i<11; i++) {
//                 if num[i]
//             }
//         }
        
//     // }
//     // else if(-10 < num < 0) { // (-)(X)(.) = 3

//     // }
//     // else if (0 <= num < 10) { // (X)(.) = 2

//     // }
//     // else if (10 <= num < 100) { // (X)(X)(.) = 3

//     // }
//     // else if (100 <= num < 1000) { // (X)(X)(X)(.) = 4

//     // }
//     return num;
// }
