import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import Spinner from "../Layout/Spinner";

class EditClient extends Component {
  constructor(props) {
    super(props);
    // create ref
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.paymentduedateInput = React.createRef();
    this.addressInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {client, firestore, history} = this.props;

    // Updates
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      paymentduedate: this.paymentduedateInput.current.value,
      address: this.addressInput.current.value,
      balance:
        this.balanceInput.current.value === " "
          ? 0
          : this.balanceInput.current.value,
    };

    // Update client in firestore
    firestore
      .update({collection: "clients", doc: client.id}, updClient)
      .then(history.push("/"));
  };

  render() {
    const {client} = this.props;

    const {disableBalanceOnEdit} = this.props.settings;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn text-secondary">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>
          <div className="card bg-img">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      ref={this.emailInput}
                      defaultValue={client.email}
                    />
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        minLength="10"
                        required
                        ref={this.phoneInput}
                        defaultValue={client.phone}
                      />
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          ref={this.addressInput}
                          defaultValue={client.address}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="paymentduedate">Payment Due Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="paymentduedate"
                          ref={this.paymentduedateInput}
                          defaultValue={client.paymentduedate}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="balance">Balance</label>
                        <input
                          type="number"
                          className="form-control"
                          name="balance"
                          ref={this.balanceInput}
                          defaultValue={client.balance}
                          disabled={disableBalanceOnEdit}
                        />
                      </div>

                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-clr btn-block"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    {collection: "clients", storeAs: "client", doc: props.match.params.id},
  ]),
  connect(({firestore: {ordered}, settings}, props) => ({
    client: ordered.client && ordered.client[0],
    settings,
  }))
)(EditClient);
