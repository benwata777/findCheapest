import React, { useState } from "react";

function PriceComparison() {
  const [prices, setPrices] = useState(Array(6).fill(""));
  const [quantities, setQuantities] = useState(Array(6).fill(""));
  const [unitPrices, setUnitPrices] = useState(Array(6).fill(""));
  const [cheapest, setCheapest] = useState("");

  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleCalculate = () => {
    const newUnitPrices = prices.map((price, index) =>
      price && quantities[index] ? (price / quantities[index]).toFixed(2) : ""
    );
    setUnitPrices(newUnitPrices);
    findCheapest(newUnitPrices);
  };

  const handleReset = () => {
    setPrices(Array(6).fill(""));
    setQuantities(Array(6).fill(""));
    setUnitPrices(Array(6).fill(""));
    setCheapest("");
  };

  const findCheapest = (unitPrices) => {
    let minPrice = Number.POSITIVE_INFINITY;
    let minIndices = [];

    unitPrices.forEach((price, index) => {
      if (price && parseFloat(price) < minPrice) {
        minPrice = parseFloat(price);
        minIndices = [index];
      } else if (price && parseFloat(price) === minPrice) {
        minIndices.push(index);
      }
    });

    if (minIndices.length > 0) {
      let message = "สินค้า ";
      minIndices.forEach((index, idx) => {
        message += `${index + 1}`;
        if (idx < minIndices.length - 1) {
          message += ", ";
        }
      });
      message += " ถูกที่สุด";
      setCheapest(message);
    } else {
      setCheapest("");
    }
  };

  return (
    <div className="App">
      <div className="comparison-table">
        <div className="header-row">
          <div className="header-cell">สินค้า</div>
          <div className="header-cell">ราคา</div>
          <div className="header-cell">จำนวนหน่วย</div>
          <div className="header-cell">ราคาต่อหน่วย</div>
        </div>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="data-row">
            <div className="data-cell">สินค้า {index + 1}</div>
            <div className="data-cell">
              <input
                type="number"
                value={prices[index]}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </div>
            <div className="data-cell">
              <input
                type="number"
                value={quantities[index]}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
            </div>
            <div className="data-cell">
              <div className="unit-price">{unitPrices[index]}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={handleCalculate}>คำนวณ</button>
        <button onClick={handleReset}>ล้างค่า</button>
      </div>

      {cheapest && <div className="cheapest">{cheapest}</div>}

      <footer>made by Benwata777</footer>
    </div>
  );
}

export default PriceComparison;
