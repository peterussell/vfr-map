export class Aerodrome {
    public name: string;
    public icaoId: string;
    public lat: number;
    public long: number;

    constructor(name, icaoId, lat, long) {
        this.name = name;
        this.icaoId = icaoId;
        this.lat = lat;
        this.long = long;
    }
}