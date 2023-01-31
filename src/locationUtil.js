let pi = 3.14159265359;

export default function locGenerator(options, userLoc) {

    // TODO: Sanitize input coords

    
    options.lastUsedMetric = options.metric;
    console.log(options);

    if(userLoc.latitude == 0 && userLoc.longitude == 0) { // if default (COULD cause a bug if someone uses the app at 0,0 lol)
        console.log("ERROR: no user data provided to locGenerator. Aborting...");
        return;
    }

    let latRangeLow = 0.0;
    let latRangeHigh = 0.0;
    let lonRangeLow = 0.0;
    let lonRangeHigh = 0.0;

    if (!options.metric) {
        latRangeLow = userLoc.latitude - options.radius / 69.00;
        latRangeHigh = userLoc.latitude + options.radius / 69.00;
        lonRangeLow = userLoc.longitude - options.radius / 69.172;
        lonRangeHigh = userLoc.longitude + options.radius / 69.172;
    }
    else {
        latRangeLow = userLoc.latitude - options.radius / 111.00;
        latRangeHigh = userLoc.latitude + options.radius / 111.00;
        lonRangeLow = userLoc.longitude - options.radius / 111.321;
        lonRangeHigh = userLoc.longitude + options.radius / 111.321;
    }

    // console.log(`lat low: ${latRangeLow}, lat high: ${latRangeHigh}, lon low: ${lonRangeLow}, lon high: ${lonRangeHigh}, RADIUS: ${options.radius}`);

    let found = false;
    while (!found) {
        // create random location
        let lat = 0.0;
        let lon = 0.0;
        lat = getRandomDouble(latRangeLow, latRangeHigh);
        lon = getRandomDouble(lonRangeLow, lonRangeHigh);

        let dist = distance(lat, lon, userLoc, options);
        console.log(`DISTANCE: ${dist} in ${options.metric ? "kilometers" : "miles"}`);
        if (dist <= options.radius) {
            // todo: create 2d coordinate and update global
            options.pinLoc = [lat, lon];
            options.distance = dist;
            options.lastUsedMetric = options.metric;
            found = true;
        }
        return options;
    }
}

function distance(destLat, destLon, userLoc, options) {

    //constants
    let r = 0;
    if (!options.metric) {
        r = 3961;
    }
    else {
        r = 6371;
    }

    //convert to rad
    let radCurrLat = deg2rad(userLoc.latitude);
    let radCurrLon = deg2rad(userLoc.longitude);
    let radDestLat = deg2rad(destLat);
    let radDestLon = deg2rad(destLon);

    // difference math
    let dlat = radDestLat - radCurrLat;
    let dlon = radDestLon - radCurrLon;

    //distance math
    let a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(radCurrLat) * Math.cos(radDestLat) *
        Math.sin(dlon / 2) * Math.sin(dlon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = r * c; // where R is the radius of the Earth
    return d;
}

function deg2rad(number) {
    return number * pi / 180;
}



function getRandomDouble(min, max) {
    return Math.random() * (max - min) + min;
}
