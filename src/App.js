import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    value: "",
    date: "",
    price: "",
    active: false
  };

  handleOption = e => {
    this.setState({
      value: e.target.id
    });
  };
  handleClick = () => {
    if (this.state.value) {
      const API = `https://financialmodelingprep.com/api/v3/cryptocurrency/${
        this.state.value
      }`;
      fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error("Brak połączenia z API");
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString();
          this.setState({
            date: time,
            price: data.price
          });
        });
    } else {
      return alert("Wybierz jedną kryptowalutę !!!");
    }
  };

  render() {
    return (
      <div className="App">
        <h1> Kursy Kryptowalut </h1>{" "}
        <section>
          <h2>Wybierz kryptowalutę</h2>
          <form onClick={this.handleOption}>
            <label>
              {" "}
              <input type="radio" name="crypto" id="btc" />
              Bitcoin
            </label>
            <label>
              {" "}
              <input type="radio" name="crypto" id="eth" />
              Ethereum
            </label>
            <label>
              {" "}
              <input type="radio" name="crypto" id="ltc" />
              Litecoin
            </label>
            <label>
              {" "}
              <input type="radio" name="crypto" id="lsk" />
              Lisk
            </label>
            <label>
              <input type="radio" name="crypto" id="xrp" />
              Ripple
            </label>
          </form>
          <button onClick={this.handleClick}>Sprawdź</button>
        </section>{" "}
        <h3>
          {" "}
          {this.state.date
            ? `Dane dla dnia i godziny: ${this.state.date}`
            : null}{" "}
        </h3>{" "}
        <h4>
          {" "}
          {this.state.price
            ? `${Math.round(this.state.price * 100) / 100} $`
            : null}{" "}
        </h4>{" "}
      </div>
    );
  }
}

export default App;
