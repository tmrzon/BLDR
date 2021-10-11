export class Statistics {
    day_views:number;
    week_views:number;
    month_views:number;
    year_views:number;
    day_users:number;
    week_users:number;
    month_users:number;
    year_users:number;
    locations: Location[];
    devices:[];
    browsers:[];
    operating_systems: [];
    pages_average:number;
    staying_time_average:number;
    abandonment_rate:number;
    year_views_arr: [];
}

export class DisplayArr {
    title: string;
    amount: number;
}
