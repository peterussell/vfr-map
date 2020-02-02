export class Aerodrome {
    name: string;
    icaoId: string;
    lat: number;
    long: number;

    constructor(name, icaoId, lat, long) {
        this.name = name;
        this.icaoId = icaoId;
        this.lat = lat;
        this.long = long;
    }
}