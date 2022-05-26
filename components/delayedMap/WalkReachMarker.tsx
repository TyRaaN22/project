import {View} from "react-native";

export default function WalkReachMarker({relativeLat}) {  
    const factor = 40000;
    return (
        <View style={{height: `${relativeLat * factor}%`, width: `${relativeLat * factor}%`, opacity: 0.3, borderRadius: `${relativeLat * factor/2}%`, backgroundColor: 'blue', elevation:11, padding:1, borderColor: 'black'}}/>       
    );
}
