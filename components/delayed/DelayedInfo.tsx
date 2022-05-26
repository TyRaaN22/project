import { View, Text, StyleSheet } from "react-native";
import {Typography, Base} from "../../styles";

export default function DelayedInfo({ route, navigation, allStations }) {
    const { delayedTrain } = route.params;

    const affectStation = allStations.find(station => station.LocationSignature === delayedTrain.FromLocation[0].LocationName);
   
    return (
        <View style={styles.base}>
            <Text style={styles.header}>{affectStation?.AdvertisedLocationName}</Text>
            <Text style={styles.label}>Tågnummer: {delayedTrain.AdvertisedTrainIdent}</Text>
            <Text style={styles.label}>Föregående avgångstid: {delayedTrain.AdvertisedTimeAtLocation.substr(0,10)} {delayedTrain.AdvertisedTimeAtLocation.substr(11,12)}</Text>
            <Text style={styles.label}>Trolig ny avgångstid: {delayedTrain.EstimatedTimeAtLocation.substr(0,10)} {delayedTrain.EstimatedTimeAtLocation.substr(11,12)}</Text>
            <Text style={styles.label}>Händelse: {delayedTrain.ActivityType}</Text>
        </View>
    );     
}

const styles = StyleSheet.create({
    base: Base.base,
    header: Typography.header1,
    label: Typography.label,
    normal: Typography.normal
  });
