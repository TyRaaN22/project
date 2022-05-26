import { delayedTrain } from '../interfaces/delayedTrain.ts';
import { station } from '../interfaces/station.ts';

const delayModel = {
    getDelayedTrains: async function getDelayedTrains(): Promise<delayedTrain[]> {
        const response = await fetch(`https://trafik.emilfolino.se/delayed`);
        const result = await response.json();

        const allDelays = result.data;
        return allDelays.filter((delay) => delay.hasOwnProperty('FromLocation'));
    },
    getStations: async function getStations(): Promise<station[]> {
        const response = await fetch(`https://trafik.emilfolino.se/stations`);
        const result = await response.json();

        return result.data;
    }
}

export default delayModel;