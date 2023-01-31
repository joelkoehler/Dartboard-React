import ReactSlider from "react-slider";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState, useEffect } from 'react';
import Toggle from 'react-styled-toggle';

export default function Options(props) {

    console.log(props)

    return (
        <div>
            <div className="options-card col">
                <h3>Max distance</h3>
                <h2 className="radius-display mono">{props.radius}</h2>
                {/* <div className="row-center"> */}
                    <ReactSlider
                        min={1}
                        max={100}
                        value={props.radius}
                        onChange={(r) => props.handleRadiusChange(r)}
                        className="horizontal-slider margin-h"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                    />
                {/* </div> */}
                <div className="row-center">
                    <p className="padding-h">mi</p><Toggle checked={props.metric} onChange={() => props.toggleOptionsMetric()} className="toggle" backgroundColorChecked="#1b2e5c" backgroundColorUnchecked="#1b2e5c"/><p className="padding-h">km</p>
                </div>
            </div>
        </div>
    )
}
