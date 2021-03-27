import * as React from "react";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import AddReservationForm from "./AddReservationForm";
import {getFromLocalStorage} from "../utils";

type ReservationTableProps = {};

type ReservationTableState = {
    error: string | null,
    isLoaded: boolean,
    days: Day[],
    intervals: Interval[],
    reservations: Reservation[],
    addModalOpen: boolean,
    selectedInterval: Interval | null,
    selectedDay: Day | null,
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
            addModalOpen: false,
            selectedDay: null,
            selectedInterval: null
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("/reservations").then(res => res.json()),
            fetch("/days").then(res => res.json()),
            fetch("/intervals").then(res => res.json())
        ])
            .then(([reservationsData, daysData, intervalsData]) => {
                this.setState({
                    isLoaded: true,
                    reservations: reservationsData,
                    days: daysData,
                    intervals: intervalsData,
                });
            })
            .catch((error) => this.setState(error))
    }

    render() {
        const {state: S} = this;
        return (
            <React.Fragment>
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
                                            const reserved = S.reservations.length > 0
                                                ? S.reservations.some(r => {
                                                        return r.timeInterval.id == interval.id && r.day.id == day.id;
                                                    }
                                                )
                                                : false;
                                            const yourReservations = getFromLocalStorage('reservations');
                                            const youReserved = yourReservations.some((r: LocalReservation) => {
                                                return r.interval_id == interval.id && r.day_id == day.id;
                                            });
                                            let color: string;
                                            if (youReserved) {
                                                color = 'warning-color'
                                            } else if (reserved) {
                                                color = 'danger-color';
                                            } else {
                                                color = 'success-color'
                                            }
                                            let text: string;
                                            if (youReserved) {

                                                text = 'Rezervované Vami';
                                            } else if (reserved) {
                                                text = 'Obsadené';
                                            } else {
                                                text = 'Voľné';
                                            }
                                            return <td
                                                style={!reserved ? {cursor: 'pointer'} : {}}
                                                key={interval.id}
                                                className={color}
                                                onClick={() => {
                                                    if (!reserved) {
                                                        this.setState({
                                                            addModalOpen: true,
                                                            selectedInterval: interval,
                                                            selectedDay: day,
                                                        });
                                                    }
                                                }}
                                            >
                                                {text}
                                            </td>;
                                        }
                                    )}
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>

                <AddReservationForm
                    open={S.addModalOpen}
                    onClose={() => {
                        this.setState({
                            addModalOpen: false,
                            selectedInterval: null,
                            selectedDay: null,
                        });
                    }}
                    afterSave={() => {
                        fetch("/reservations")
                            .then(res => res.json())
                            .then(data => {
                                this.setState({
                                    reservations: data,
                                    addModalOpen: false,
                                    selectedInterval: null,
                                    selectedDay: null,
                                })
                            })
                    }}
                    day={S.selectedDay}
                    interval={S.selectedInterval}
                />
            </React.Fragment>
        )
    }
}

export default ReservationTable;