function Sets() {};

Sets.intersection = function(s1, s2) {
    let set = new Set();
    for(let item of s1){
        if(s2.has(item)) set.add(item)
    }
    return set;
}

Sets.union = function(s1, s2){
    let set = new Set(s1);
    for(let item of s2){
        set.add(item);
    }
    return set;
}

Sets.greedyCoverage = function(states, stations) {
    let leftStates = new Set(states);
    let leftStations = new Map(stations);
    let neededStations = new Map();

    function findBestStation(){
        let maxNewStates = 0;
        let bestStation = null;

        for(let station of leftStations) {
            let newStates = Sets.intersection(station[1], leftStates);
            if(newStates.size > maxNewStates) {
                maxNewStates = newStates.size;
                bestStation = station;
            }
        }

        return bestStation;
    }

    while(leftStates.size > 0 && leftStations.size > 0){
        let bestStation = findBestStation();
        if(bestStation) {
            neededStations.set(bestStation[0], bestStation[1]);
            leftStations.delete(bestStation[1]);
            for(let stationForDelete of bestStation[1]){
                leftStates.delete(stationForDelete);
            }
        }
    }

    return neededStations;
}