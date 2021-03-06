import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    paymentduedate: "",
    balance: "",
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newClient = this.state;

    const {firestore, history} = this.props;

    // if no balance make it 0
    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    firestore
      .add({collection: "clients"}, newClient)
      .then(() => history.push("/"));
  };

  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  render() {
    const {disableBalanceOnAdd} = this.props.settings;

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
          <div className="card-header">Add Client</div>
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
                  onChange={this.onChange}
                  value={this.state.firstName}
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
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      minLength="10"
                      required
                      onChange={this.onChange}
                      value={this.state.phone}
                    />

                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        onChange={this.onChange}
                        value={this.state.address}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="paymentduedate">Payment Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="paymentduedate"
                        onChange={this.onChange}
                        value={this.state.paymentduedate}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="balance">Balance</label>
                      <input
                        type="number"
                        className="form-control"
                        name="balance"
                        onChange={this.onChange}
                        value={this.state.balance}
                        disabled={disableBalanceOnAdd}
                      />
                    </div>

                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-clr btn-block text-white"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings,
  }))
)(AddClient);
