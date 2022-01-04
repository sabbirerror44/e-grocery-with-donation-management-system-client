import { faEnvelopeSquare, faPhoneAlt, faSmileBeam } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ContactWelcome.css';

const ContactWelcome = () => (
    <div className="contact-welcome">
        <div className="container">
            <p className="d-lg-inline p-lg-4">
                <FontAwesomeIcon className="mr-2" style={{ color: '#eb5252' }} icon={faPhoneAlt} />
                +8801833904498
            </p>
            <p className="d-lg-inline p-lg-4">
                <FontAwesomeIcon
                    className="mr-1"
                    style={{ color: '#eb5252' }}
                    icon={faEnvelopeSquare}
                />
                egrocery.com.bd
            </p>
            <p className="d-lg-inline float-lg-right">
                <FontAwesomeIcon className="mr-1" style={{ color: '#eb5252' }} icon={faSmileBeam} />
                Welcome to e-Grocery
            </p>
        </div>
    </div>
);

export default ContactWelcome;
