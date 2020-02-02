export class VisualReportingPoint {
    public name: string;
    public lat: number;
    public long: number;

    constructor(name: string, lat: number, long: number) {
        this.name = name;
        this.lat = lat;
        this.long = long;
    }
}