import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DelayedList from './DelayedList.tsx';
import DelayedInfo from './DelayedInfo.tsx';

const Stack = createNativeStackNavigator();

export default function Delayed({allDelays, allStations}) {
    return (
        <Stack.Navigator initialRouteName="Förseningar">
            <Stack.Screen name="Förseningar">
                {(screenProps) => <DelayedList {...screenProps} allDelays={allDelays} />}
            </Stack.Screen>
            <Stack.Screen name="FörseningsInfo">
                {(screenProps) => <DelayedInfo {...screenProps} allStations={allStations}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}