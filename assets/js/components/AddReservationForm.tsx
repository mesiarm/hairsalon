import {MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import * as React from "react";
import {storeInLocalStorage} from '../utils';

type AddReservationFormProps = {
    open: boolean,
    onClose: () => void,
    afterSave: () => void,
    day: Day | null,
    interval: Interval | null,
};
type AddReservationFormState = {
    fullName: string,
    phone: string,
    note: string,
};

class AddReservationForm extends React.Component<AddReservationFormProps, AddReservationFormState> {
    constructor(props: AddReservationFormProps) {
        super(props);

        this.state = {
            fullName: '',
            phone: '',
            note: ''
        };
    }

    submitHandler(event: any) {
        event.preventDefault();
        const {props: P, state: S} = this;
        const formData = new FormData();
        formData.append('name', S.fullName);
        formData.append('phone', S.phone);
        formData.append('note', S.note);
        formData.append('interval_id', P.interval ? P.interval.id.toString() : '')
        formData.append('day_id', P.day ? P.day.id.toString() : '')
        const localReservation: LocalReservation = {
            'interval_id': P.interval ? P.interval.id : -1,
            'day_id': P.day ? P.day.id : -1,
        };
        storeInLocalStorage('reservations', localReservation);
        fetch('/reservations', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'ok') {
                    P.afterSave();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {
        const {props: P} = this;
        return (
            <MDBModal
                isOpen={P.open}
                inline={false}
                toggle={() => P.onClose()}
                overflowScroll
                noClickableBodyWithoutBackdrop={true}
            >
                <MDBModalHeader>Rezervova?? na term??n</MDBModalHeader>
                <MDBModalHeader titleClass={'h6'}>
                    {P.day?.name} {P.interval?.fromTime}-{P.interval?.toTime}
                </MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.submitHandler(event)}>
                        <MDBInput
                            label="Meno a priezvisko"
                            icon="user"
                            type="text"
                            validate={true}
                            error="wrong"
                            success="right"
                            onChange={(event) => {
                                const element = event.target as HTMLInputElement;
                                this.setState({fullName: element.value});
                            }}
                            required
                        />
                        <MDBInput
                            label="Telef??n"
                            icon="phone"
                            group
                            type="phone"
                            validate
                            error="wrong"
                            success="right"
                            onChange={(event) => {
                                const element = event.target as HTMLInputElement;
                                this.setState({phone: element.value});
                            }}
                            required
                        />
                        <MDBInput
                            type="textarea"
                            rows="2"
                            label="Pozn??mka"
                            onChange={(event) => {
                                const element = event.target as HTMLInputElement;
                                this.setState({note: element.value});
                            }}
                            icon="pencil-alt"
                        />
                        <MDBBtn color="primary" type="submit">Ulo??i?? rezerv??ciu</MDBBtn>
                        <MDBBtn color="secondary" onClick={() => P.onClose()}>
                            Zavrie??
                        </MDBBtn>
                    </form>
                </MDBModalBody>
            </MDBModal>
        );
    }
}

export default AddReservationForm;