import React from "react";
import {MDBContainer, MDBJumbotron} from "mdbreact";
import ReservationTable from "./ReservationTable";

class Home extends React.Component {
    render() {
        return (
            <MDBContainer>
                <MDBJumbotron>
                    <MDBContainer>
                        <h2 className="display-4 text-center">Kaderníctvo Janka</h2>
                        <p className="lead text-center">Rezervujte si termín na styling vlasov.</p>
                    </MDBContainer>
                </MDBJumbotron>

                <ReservationTable/>
            </MDBContainer>
        )
    }
}

export default Home;