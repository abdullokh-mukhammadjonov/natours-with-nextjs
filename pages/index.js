import React from "react";
import axios from "axios";

class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkBoxChecked: false,
    };
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }
  handleCheckBoxClick = () => {
    this.setState({ checkBoxChecked: !this.state.checkBoxChecked });
  };

  render() {
    return (
      <div>
        <div
          className="form-check form-check-inline"
          style={{ paddingTop: "20px" }}
        >
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
            onChange={this.handleCheckBoxClick}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Daily
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
            onChange={this.handleCheckBoxClick}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Hourly
          </label>
        </div>
      </div>
    );
  }
}

// export default CheckBox;


// import React from "react";
// import CheckBox from "../checkBox/checkBox";

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: "",
      alerts: "",
      submit: this.props.value,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAlertButtonClick = () => {
    const data = this.state.alerts;

    // axios.post("/test", data);
    if (this.state.submit === true) {
      console.log(data);
    }
  };

  handleSaveButtonClick = () => {
    const data = this.state.alerts;

    // axios.post("/save", data);
    if (this.state.submit === true) {
      console.log(data);
    }
  };

  handleSaveChange = (e) => {
    let { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
    console.log(this.state)
  };

  handleSubmit = (event) => {
    let submit = this.state.submit;
    if (submit !== true) {
      alert("This form is invalid please try again!");
      event.preventDefault();
    } else {
      alert("Your form has been succesfully submitted");
    }
  };

  render() {
    //const { checkCheckBox } = this.props;

    return (
      <div>
        {" "}
        <form className="needs-validation" onSubmit={this.handleSubmit}>
          <div className="form-group" style={{ paddingTop: "40px" }}>
            <label htmlFor="alertInput"> Alert Message</label>
            <input
              name="alerts"
              type="text"
              className="form-control"
              id="alertInput"
              placeholder="Alert Message"
              onChange={this.handleSaveChange}
              ref={(input) => this.input}
              required
            />
          </div>

          <CheckBox required />

          <div className="form-group" style={{ paddingTop: "30px" }}>
            <label htmlFor="emailInput">Email Recipients</label>
            <input
              name="emails"
              type="email"
              multiple
              className="form-control"
              id="emailInput"
              placeholder="Email Recipients"
              required
              onChange={this.handleSaveChange}
            />
          </div>
          <div
            className="d-grid gap-2 d-md-flex justify-content-md-end"
            style={{ paddingTop: "25px" }}
          >
            <button
              className="btn btn-primary me-md-2"
              type="submit"
              onClick={this.handleAlertButtonClick}
            >
              Test Alert
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSaveButtonClick}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Forms;