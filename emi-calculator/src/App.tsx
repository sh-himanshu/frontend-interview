import { useMemo, useState } from 'react';
import './App.css';
import NumberInput from './components/number-input/NumberInput';
import SliderInput from './components/slider-input/SliderInput';
import TenureInput from './components/tenure-input/TenureInput';

const App = () => {
  const [interestRate, setInterestRate] = useState(0);
  const [processingFee, setProcessingFee] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [downPayment, setDownPayment] = useState(20);
  const [loanPerMonth, setLoanPerMonth] = useState(0);
  const [tenure, setTenure] = useState(12);

  const totalDownPayment = useMemo(() => {
    if (totalCost > 0) {
      const dpAmount = totalCost * (downPayment / 100);
      const principleAmount = totalCost - dpAmount;
      const processingFeeAmount = principleAmount * (processingFee / 100);
      return Math.round(dpAmount + processingFeeAmount);
    }
    return 0;
  }, [totalCost, processingFee, downPayment]);

  return (
    <div className="container">
      <h1 className="heading">EMI Calculator</h1>
      <NumberInput
        value={totalCost}
        onChange={e => {
          console.log(e.target.value);
          e.target.value = '69';
          console.log(e.target.value);
          setTimeout(() => console.log(totalCost), 5000);
          return;
          if (/[0-9]+/.test(e.target.value)) {
            const value = parseInt(e.target.value);
            setTotalCost(value);
          }
          if (e.target.value === '') setTotalCost(0);
        }}
        title={'Total Cost of Asset'}
        id="cost"
      />
      <NumberInput
        value={interestRate}
        onChange={e => {
          if (/[0-9]+/.test(e.target.value)) {
            const value = parseInt(e.target.value);
            if (value >= 0 && value <= 100) setInterestRate(value);
          }
          if (e.target.value === '') setInterestRate(0);
        }}
        title={'Interest Rate (in %)'}
        id="interest-rate"
      />
      <NumberInput
        value={processingFee}
        onChange={e => {
          if (/[0-9]+/.test(e.target.value)) {
            const value = parseInt(e.target.value);
            if (value >= 0 && value <= 100) setProcessingFee(value);
          }
          if (e.target.value === '') setProcessingFee(0);
        }}
        title={'Processing Fee (in %)'}
        id="processing-fee"
      />
      <SliderInput
        size={100}
        value={downPayment}
        onChange={e => setDownPayment(parseInt(e.target.value, 10))}
        title={'Down Payment'}
        title2={`Total Down Payment - ₹${totalDownPayment}`}
        id="down-payment"
      />
      <SliderInput
        size={100}
        value={loanPerMonth}
        onChange={e => setLoanPerMonth(parseInt(e.target.value, 10))}
        title={'Loan per Month'}
        title2={`Total Loan Amount - ₹XXX`}
        id="loan-per-month"
      />
      <TenureInput
        value={tenure}
        setValue={setTenure}
        title={'Tenure'}
        months={[12, 24, 36, 48, 60]}
        id="tenure"
      />
    </div>
  );
};

export default App;
