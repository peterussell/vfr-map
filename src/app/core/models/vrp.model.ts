export class VisualReportingPoint {
    name: string;
    lat: number;
    long: number;

    constructor(name: string, lat: number, long: number) {
        this.name = name;
        this.lat = lat;
        this.long = long;
    }
}