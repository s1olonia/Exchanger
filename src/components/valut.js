import React, { useEffect, useState } from "react";
import CurrencyList from "./calc";
function Show({ setDataProp }) {
  const url =
    "https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014";
  const [data, setDataState] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedCurrency1, setSelectedCurrency1] = useState("");
  const [selectedCurrency2, setSelectedCurrency2] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("jsonData: ", jsonData);

      const filteredData = jsonData.exchangeRate.filter(
        (item) => item.saleRate !== undefined
      );
      setDataState(filteredData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currency1 = data.find((item) => item.currency === selectedCurrency1);
    const currency2 = data.find((item) => item.currency === selectedCurrency2);

    const convertedAmountValue =
      (amount * currency1.saleRate) / currency2.purchaseRate;
    setConvertedAmount(convertedAmountValue);
  };

  const isButtonDisabled =
    !amount || !selectedCurrency1 || !selectedCurrency2 || loading;

  return (
    <div className="conteiner">
      <div className="right">
        <CurrencyList data={data} />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="left">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currency1">Currency 1:</label>
          <select
            id="currency1"
            value={selectedCurrency1}
            onChange={(e) => setSelectedCurrency1(e.target.value)}
          >
            {data.map((item) => (
              <option key={item.currency}>{item.currency}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="currency2">Currency 2:</label>
          <select
            id="currency2"
            value={selectedCurrency2}
            onChange={(e) => setSelectedCurrency2(e.target.value)}
          >
            {data.map((item) => (
              <option key={item.currency}>{item.currency}</option>
            ))}
          </select>
        </div>
      {convertedAmount > 0 && (
        <p>{`Converted amount: ${convertedAmount.toFixed(
          3
        )} ${selectedCurrency2}`}</p>
      )}
        <button type="submit" disabled={isButtonDisabled}>
          Convert
        </button>
      </form>
    </div>
  );
}

export default Show;
