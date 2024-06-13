import React, { useEffect, useState } from "react";
import Decimal from "decimal.js";
import { Button } from "~~/components/ui/button";
import useEthPrice from "~~/hooks/useEthPrice";

type TokenSwitcherProps = {
  valueState: [string, React.Dispatch<React.SetStateAction<string>>];
  defaultCurrencyIndex?: number;
  dollarValueState?: [number, React.Dispatch<React.SetStateAction<number>>];
  ethValueState?: [number, React.Dispatch<React.SetStateAction<number>>];
  refresh?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const TokenSwitcher = ({
  valueState,
  dollarValueState,
  ethValueState,
  defaultCurrencyIndex = 0,
  refresh,
}: TokenSwitcherProps) => {
  const [value, setValue] = valueState;
  const currencies = ["USD", "ETH", "WEI", "GWEI"];
  const [currencyIndex, setCurrencyIndex] = useState(defaultCurrencyIndex);
  const { data: ethInUsd, isLoading, error } = useEthPrice(false);

  const dollarValueStateTemp = useState(0);
  const [, setDollarValue] = dollarValueState ? dollarValueState : dollarValueStateTemp;

  const ethValueStateTemp = useState(0);
  const [, setEthValue] = ethValueState ? ethValueState : ethValueStateTemp;

  useEffect(() => {
    if (!value) return;
    if (value === "") return;
    if (isNaN(Number(value))) return;
    if (isLoading || error) return;

    const currentCurrency = currencies[currencyIndex];
    let dollarValue = 0;
    let ethValue = 0;

    //Dollar Value
    if (currentCurrency !== "USD") {
      let ethConverted = new Decimal(value);
      if (currentCurrency !== "ETH") {
        ethConverted = (toETH[currentCurrency as keyof typeof toETH] as (value: Decimal) => Decimal)(
          new Decimal(value),
        );
      }
      const dollarValueStr = (fromETH.USD as (value: Decimal) => Decimal)(ethConverted).toString();
      dollarValue = Number(dollarValueStr);
    } else {
      dollarValue = Number(value);
    }
    if (isNaN(dollarValue)) {
      setDollarValue(0);
    } else {
      setDollarValue(dollarValue);
    }

    //ETH Value
    if (currentCurrency !== "ETH") {
      const ethConverted = (toETH[currentCurrency as keyof typeof toETH] as (value: Decimal) => Decimal)(
        new Decimal(value),
      );
      const ethValueStr = ethConverted.toString();
      ethValue = Number(ethValueStr);
    } else {
      ethValue = Number(value);
    }
    if (isNaN(ethValue)) {
      setEthValue(0);
    } else {
      setEthValue(ethValue);
    }
  }, [value, currencyIndex]);

  useEffect(() => {
    const convertedCurrency = convert(currencies[currencyIndex], currencies[defaultCurrencyIndex]);
    if (convertedCurrency) {
      setValue(convertedCurrency);
    }
    // console.log(
    //   "debug refreshChanged",
    //   "from",
    //   currencies[currencyIndex],
    //   "to",
    //   currencies[defaultCurrencyIndex],
    //   "amount",
    //   value,
    //   convertedCurrency,
    // );

    setCurrencyIndex(defaultCurrencyIndex);
  }, [refresh]);

  const fromETH = {
    USD: (value: Decimal) => value.mul(new Decimal(ethInUsd as number)),
    WEI: (value: Decimal) => value.mul(new Decimal(1e18)),
    GWEI: (value: Decimal) => value.mul(new Decimal(1e9)),
  };

  const toETH = {
    USD: (value: Decimal) => value.div(new Decimal(ethInUsd as number)),
    WEI: (value: Decimal) => value.div(new Decimal(1e18)),
    GWEI: (value: Decimal) => value.div(new Decimal(1e9)),
  };

  const convert = (previousCurrency: string, newCurrency: string): string | undefined => {
    if (!value) return;
    if (value === "") return;
    if (isNaN(Number(value))) return;
    if (isLoading || error) return;

    let ethConverted = new Decimal(value);
    if (previousCurrency !== "ETH") {
      ethConverted = (toETH[previousCurrency as keyof typeof toETH] as (value: Decimal) => Decimal)(ethConverted);
    }

    let currencyConverted = ethConverted;
    if (newCurrency !== "ETH") {
      currencyConverted = (fromETH[newCurrency as keyof typeof fromETH] as (value: Decimal) => Decimal)(ethConverted);
    }

    return currencyConverted.toString();
  };

  const handleClick = () => {
    const convertedCurrency = convert(currencies[currencyIndex], currencies[(currencyIndex + 1) % currencies.length]);
    if (convertedCurrency) {
      setValue(convertedCurrency);
    }
    setCurrencyIndex((currencyIndex + 1) % currencies.length);
  };

  return (
    <Button className="px-2 rounded-lg" variant={"primaryGhost"} onClick={handleClick} disabled={isLoading || error}>
      {currencies[currencyIndex]}
    </Button>
  );
};

export default TokenSwitcher;
