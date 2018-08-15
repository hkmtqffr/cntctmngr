import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends React.Component {
    state = {
        showContactInfo: false
    };

    onDeleteClick = async (id, dispatch) => {
        try {
            await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({ type: 'DELETE_CONTACT', payload: id })
        } catch (e) {
            dispatch({ type: 'DELETE_CONTACT', payload: id })
        }
    }

    onShowClick = () => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        });
    }
    render() {
        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body mb-3">
                            <h4>{name}
                                <i onClick={this.onShowClick.bind(this)}
                                    style={{ cursor: 'pointer' }}
                                    className="fas fa-sort-down"></i>
                                <i onClick={this.onDeleteClick.bind(this, id, dispatch)}
                                    style={{
                                        cursor: 'pointer',
                                        float: 'right',
                                        color: 'red'
                                    }}
                                    className="fas fa-times"></i>
                                <Link to={`contact/edit/${id}`}
                                    style={{
                                        cursor: 'pointer',
                                        color: 'black',
                                        float: 'right',
                                        marginRight: '1rem'
                                    }}><i className="fas fa-pencil-alt"></i></Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
}

export default Contact;