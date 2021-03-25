import * as React from "react";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";

type ReservationTableProps = {
    // using `interface` is also ok
    message: string;
};
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
    interval: Interval,
    day: Day,
}
type ReservationTableState = {
    error: string | null,
    isLoaded: boolean,
    days: Day[],
    intervals: Interval[],
    reservations: Reservation[],
};

class ReservationTable extends React.Component<ReservationTableProps, ReservationTableState> {
    constructor(props: ReservationTableProps) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            days: [],
            intervals: [],
            reservations: [],
        };
    }

    componentDidMount() {
        fetch("http://hairsalon.local/reservations")
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        reservations: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        fetch("http://hairsalon.local/days")
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        days: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        fetch("http://hairsalon.local/intervals")
            .then(res => res.json())
            .then((result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        intervals: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {state: S} = this;
        return (
            <MDBTable striped hover responsive>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        {S.intervals.map(interval =>
                            <th
                                key={interval.id}
                            >
                                {interval.fromTime}-{interval.toTime}
                            </th>
                        )}
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        S.days.map(day => (
                            <tr key={day.id}>
                                <td>{day.name}</td>
                                {S.intervals.map(interval => {
                                    console.log(S.reservations.length > 0);
                                        const reserved = S.reservations.length > 0 ? S.reservations.some(r => {
                                                return r.interval.id === interval.id &&
                                                    r.day.id === day.id;
                                            }
                                        ): false;
                                        const color = reserved ? 'danger-color' : 'success-color';
                                        const text = reserved ? 'Obsadené' : 'Voľné';
                                        return <th key={interval.id} className={color}>{text}</th>;
                                    }
                                )}
                            </tr>
                        ))
                    }
                </MDBTableBody>
            </MDBTable>
        )
    }
}

export default ReservationTable;