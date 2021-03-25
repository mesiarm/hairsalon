import * as React from "react";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";

class ReservationTable extends React.Component {
    render() {
        return (
            <MDBTable striped hover responsive>
                <MDBTableHead>
                    <tr>
                        <th>#</th>
                        <th>08:00 - 08:30</th>
                        <th>08:30 - 09:00</th>
                        <th>09:00 - 09:30</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <td>Pondelok</td>
                        <td className={'success-color'}>Voľné</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'danger-color'}>Obsadené</td>
                    </tr>
                    <tr>
                        <td>Utorok</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'danger-color'}>Obsadené</td>
                    </tr>
                    <tr>
                        <td>Streda</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'success-color'}>Voľné</td>
                        <td className={'danger-color'}>Obsadené</td>
                    </tr>
                    <tr>
                        <td>Štvrtok</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'danger-color'}>Obsadené</td>
                    </tr>
                    <tr>
                        <td>Piatok</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'danger-color'}>Obsadené</td>
                        <td className={'success-color'}>Voľné</td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
        )
    }
}

export default ReservationTable;