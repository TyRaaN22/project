import { location } from './location.ts';

export default interface delayedTrain {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    EstimatedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: boolean,
    FromLocation: Array<location>,
    ToLocation: Array<location>,
}