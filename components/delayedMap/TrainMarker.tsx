import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";

export default function TrainMarker({trainNr}) {
    
    return (
        <View style={styles.trainMarker}>
            <Text style={styles.label}>{trainNr}</Text>
        </View>    
        
    );
}

const styles = StyleSheet.create({
    trainMarker: Base.trainMarker,
    label: Typography.label,
});