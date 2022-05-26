import {Image, StyleSheet, Text, ScrollView, View} from 'react-native';
import train from '../../assets/train.jpg';
import { Base, Typography } from '../../styles';
import { backgroundView } from '../../styles/base';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={backgroundView}>
                <Image source={train} style={styles.backgroundImage}/>
            </View>
            <ScrollView style= {styles.scrollViewStd}>
                <Text style={styles.header}>Tågförsenings-appen</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    base: Base.base,
    scrollViewStd: Base.scrollViewStd,
    backgroundImage: Base.backgroundImage,
    header: Typography.header1,
    container: Base.container,
    backgroundView: Base.backgroundView
});