export interface PricePoint {
    date:string;
    close:number;
}

export interface PriceHistory {
    symbol:string;

    current_price:number;

    change:number;

    change_percent:number;

    high_52_week:number;

    low_52_week:number;

    prices:PricePoint[];
}