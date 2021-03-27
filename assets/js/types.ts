type Day = {
    id: number,
    name: string,
}

type Interval = {
    id: number,
    fromTime: string,
    toTime: string,
};

type Reservation = {
    id: number,
    timeInterval: Interval,
    day: Day,
}

type LocalReservation = {
    interval_id: number;
    day_id: number;
}