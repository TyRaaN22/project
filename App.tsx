import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { useState, useEffect } from 'react';
import Home from './components/home/Home.tsx';
import Delayed from './components/delayed/Delayed.tsx';
import DelayedMap from './components/delayedMap/DelayedMap.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import delayModel from "./models/delays";

const routeIcons = {
  "Home": "home",
  "Delayed": "sad",
  "DelayedMap": "globe"
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [allStations, setAllStations] = useState([]);
  const [allDelays, setAllDelays] = useState([]);
  const [mapViewSize, setMapViewSize] = useState({width: 0, height: 0});

  useEffect(async () => {
    setAllStations(await delayModel.getStations());
  }, []);

  useEffect(async () => {
    setAllDelays(await delayModel.getDelayedTrains());
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Delayed">
            {() => <Delayed allStations={allStations} allDelays={allDelays} />}
          </Tab.Screen>
          <Tab.Screen name="DelayedMap">
            {() => <DelayedMap allStations={allStations} allDelays={allDelays} mapViewSize={mapViewSize} setMapViewSize={setMapViewSize}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
