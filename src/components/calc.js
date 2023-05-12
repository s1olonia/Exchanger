import React from "react";

function CurrencyList({ data }) {
  const filteredData = data.filter((item) => item.saleRate !== undefined);

  return (
    <div className="list-wrapper ">
      <h2>Currency List</h2>
      <ul className="list">
        {filteredData.map((item) => (
          <li
            key={item.currency}
          >{`${item.currency}: купівля ${item.saleRate} продаж ${item.purchaseRate}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyList;
