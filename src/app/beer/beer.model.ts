export class Beer {
    id?: string;
    name: string;
    styleId: string;
    brewerId: string;
    alc: number;
    srm: number;
    ibu: number;
    glass: number;
    normalPrice: number;
    happyPrice: number;
    active: boolean;
    position: number;

    constructor(aName: string, aStyleId: string, aBrewerId: string, anAlc: number, aSrm: number, anIbu: number, aGlass: number, aNomrmalPrice: number, aHappyPrice: number, isActive: boolean, aPosition: number) {
        this.name = aName;
        this.styleId = aStyleId;
        this.brewerId = aBrewerId;
        this.alc = anAlc;
        this.srm = aSrm;
        this.ibu = anIbu;
        this.glass = aGlass;
        this.normalPrice = aNomrmalPrice;
        this.happyPrice = aHappyPrice;
        this.active = isActive;
        this.position = aPosition || 1;
    }
}