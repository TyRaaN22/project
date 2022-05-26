const mapModel = {
 
    getRelativeLat: function getRelativeLat(trainDelayTime, deltaLatitude) {
        const currDate = new Date();
        const delayDate = new Date(trainDelayTime);
        let timedifference = (delayDate - currDate) / 1000 / 60;
        if (timedifference <= 0) {
            timedifference = 1;
        } else {
            timedifference = Math.floor(timedifference);
        }
        const walkReachLat = 40 * timedifference / 111139;
        return walkReachLat / deltaLatitude;

    }

}

export default mapModel;