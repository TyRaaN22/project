import { ScrollView, Button } from 'react-native';

export default function DelayedList({navigation, allDelays}) {

    const listOfDelays = allDelays
        .map((delayedTrain, index) => {
            return <Button
                title={delayedTrain.AdvertisedTrainIdent}
                key={index}
                onPress={() => {
                    navigation.navigate('FörseningsInfo', {
                        delayedTrain: delayedTrain
                    });
                }}
            />
        });

    return (
        <ScrollView>
            {listOfDelays}
        </ScrollView>
    );
}