export default interface station {
    LocationSignature: string,
    AdvertisedLocationName: string,
    Geometry: { WGS84: string },
    PlatfromLine: string[]
}