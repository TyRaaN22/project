import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import TrainMarker from "./TrainMarker";
import WalkReachMarker from "./WalkReachMarker";
import mapModel from "../../models/map";

export default function ShipOrder({allDelays, allStations, mapViewSize, setMapViewSize}) {
    const [stationMarkers, setStationMarkers] = useState(null);
    const [walkReachMarkers, setWalkReachMarkers] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deltaLatitude, setDeltaLatitude] = useState(0.1);

    const onLayout = (event) => {
        setMapViewSize(event.nativeEvent.layout);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const locationCurrent = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: locationCurrent.coords.latitude,
                    longitude: locationCurrent.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setStationMarkers(allDelays.map((trainDelay) => {
                const affectStation = allStations.find((station) => station.LocationSignature === trainDelay.FromLocation[0].LocationName);
                const affectStationLonLat = affectStation.Geometry.WGS84.replace(/[()]/g, '').split(' ');
                const cleanupDate = new Date(trainDelay.EstimatedTimeAtLocation);
                return <Marker
                    coordinate={{ latitude: parseFloat(affectStationLonLat[2]),
                    longitude: parseFloat(affectStationLonLat[1])}}
                    title={affectStation.AdvertisedLocationName}
                    description={`${cleanupDate.toLocaleDateString()} ${cleanupDate.toLocaleTimeString()}`}>
                        <TrainMarker trainNr={trainDelay.AdvertisedTrainIdent} />
                    </Marker>
            }));

        })();
    }, []);

    useEffect(() => {
        (async () => {
            setWalkReachMarkers(allDelays.map((trainDelay) => {
                const affectStation = allStations.find((station) => station.LocationSignature === trainDelay.FromLocation[0].LocationName);
                const affectStationLonLat = affectStation.Geometry.WGS84.replace(/[()]/g, '').split(' ');
                const trainDelayTime = trainDelay.EstimatedTimeAtLocation;
                const relativeLat = mapModel.getRelativeLat(trainDelayTime, deltaLatitude);
                return <Marker
                    coordinate={{ latitude: parseFloat(affectStationLonLat[2]),
                    longitude: parseFloat(affectStationLonLat[1])}}
                    title={affectStation.AdvertisedLocationName}
                    anchor={{x: 0.5, y: 0.5}}
                    centerOffset={{x: -(relativeLat * mapViewSize.width), y: -(relativeLat * mapViewSize.height * 0.7)}}> 
                        <WalkReachMarker
                            relativeLat={relativeLat}/>
                    </Marker>
            }));

        })();
    }, [deltaLatitude]);

    const updateRegionLatState = (region) => setDeltaLatitude(region.latitudeDelta);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Förseningar</Text>
            <View style={styles.container}>
                <MapView 
                    onLayout={onLayout}
                    style={styles.map}
                    initialRegion={{
                        latitude: 58.4102,
                        longitude: 15.6225,
                        latitudeDelta: deltaLatitude,
                        longitudeDelta: 0.1,
                    }}
                    onRegionChangeComplete={(region) => {
                        updateRegionLatState(region);
                    }}>
                    {walkReachMarkers}
                    {stationMarkers}
                    {locationMarker}
                    
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});