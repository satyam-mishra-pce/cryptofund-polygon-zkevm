import React from "react";

const Hero = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <h1 className="font-bold text-lg" style={{ marginBlockEnd: 0 }}>
        CryptoFund
      </h1>
      <img src="/assets/images/logo-gradient-inset-shadow.png" className="h-4" />
    </div>
  );
};

export default Hero;
