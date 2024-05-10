'use client';

import OtpInput from '@/components/OtpInput';
import { useState } from 'react';

const Home = () => {
  const [otp, setOtp] = useState([...new Array(6)].map(() => ''));
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-sky-700 ">
      <OtpInput otp={otp} setOtp={value => setOtp(value)} phoneNumber={'+919472649745'} />
    </div>
  );
};

export default Home;
