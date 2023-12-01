import { useCallback, useEffect, useState } from 'react';
import pochita from './assets/pochita.jpg';
import { Button, Flex, Card, Input, Select } from 'antd';
import './App.css';

const statesTaxes = {
  UT: 0.0685,
  NV: 0.08,
  TX: 0.0625,
  AL: 0.04,
  CA: 0.0825,
};

const discounts = {
  1000: 0.03,
  5000: 0.05,
  7000: 0.07,
  10000: 0.1,
  50000: 0.15,
};

const states = [
  { value: 'UT', label: 'UT', tax: statesTaxes.UT },
  { value: 'NV', label: 'NV', tax: statesTaxes.NV },
  { value: 'TX', label: 'TX', tax: statesTaxes.TX },
  { value: 'AL', label: 'AL', tax: statesTaxes.AL },
  { value: 'CA', label: 'CA', tax: statesTaxes.CA },
];

function App() {
  const [productQuantity, setProductQuantity] = useState(0);
  const [price, setPrice] = useState(300);
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(statesTaxes.UT);
  const [discount, setDiscount] = useState(0);

  const getTotalPrice = () => {
    const totalPriceAfterTax =
      subtotal - subtotal * getDiscount() + subtotal * taxRate;

    return totalPriceAfterTax;
  };

  const getTotalPriceBeforeTaxes = () => {
    const subTotalPrice = productQuantity * price;
    setSubtotal(subTotalPrice);
  };

  const getDiscount = useCallback(() => {
    if (subtotal < 1000) {
      return 0;
    }
    if (subtotal >= 1000 && subtotal < 5000) {
      return discounts['1000'];
    }
    if (subtotal >= 5000 && subtotal < 7000) {
      return discounts['5000'];
    }
    if (subtotal >= 7000 && subtotal < 10000) {
      return discounts['7000'];
    }
    if (subtotal >= 10000 && subtotal < 50000) {
      return discounts['10000'];
    }
    if (subtotal >= 50000) {
      return discounts['50000'];
    }
  }, [getTotalPriceBeforeTaxes, discounts]);

  const handleChange = (value) => {
    setTaxRate(statesTaxes[value]);
  };

  useEffect(() => {
    getTotalPriceBeforeTaxes();
    const discount = getDiscount();
    setDiscount(discount);
  }, [price, subtotal]);

  return (
    <>
      <h1>Pochita Rules</h1>
      <Flex justify="center">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={pochita} />}
        >
          <Card.Meta
            title="Pochita Rules Poster"
            description={
              <Input
                style={{ margin: '1em 0 0 0' }}
                placeholder="Enter your bet"
                prefix={`€`}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
              />
            }
          />
          <Input
            style={{ margin: '1em 0 0 0' }}
            placeholder="Enter your quantity"
            onChange={(e) => setProductQuantity(Number(e.target.value))}
            type="number"
            value={productQuantity}
          />
        </Card>
      </Flex>
      <h2>Viva la libertad Carajo!</h2>
      <div className="card">
        <div className="buttonCard">
          <Button
            type="primary"
            onClick={() =>
              setProductQuantity((productQuantity) => productQuantity + 1)
            }
          >
            Add Product
          </Button>
        </div>
        <div className="buttonCard">
          <Select
            defaultValue="UT"
            style={{ width: 120 }}
            onChange={handleChange}
            options={states}
          />
        </div>
        <Flex gap="middle" vertical>
          <Flex
            gap="middle"
            style={{
              borderRadius: '5px',
              border: '1px solid lightgray',
              padding: '1em',
            }}
          >
            <p>Total Quantity: {productQuantity}</p>
            <p>Discount: {(discount * 100).toFixed(2)}%</p>
            <p>Tax Rate (UT): {(taxRate * 100).toFixed(2)}%</p>
          </Flex>
          <Flex justify="flex-end">
            <p
              style={{
                borderRadius: '5px',
                border: '1px solid lightgray',
                padding: '1em',
              }}
            >
              Total Price: € {getTotalPrice().toFixed(2)}
            </p>
          </Flex>
          <Button onClick={() => setProductQuantity(0)}>Reset</Button>
        </Flex>
      </div>
    </>
  );
}

export default App;
