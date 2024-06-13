import { useEffect, useState } from "react";

const useEthPrice = (refresh: boolean) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<number>();
  const [error, setError] = useState(undefined);

  const fetchData = async () => {
    const response = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH");
    const obj = await response.json();
    return obj.data.rates["USD"];
  };

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(value => {
        setLoading(false);
        setData(parseFloat(value as string));
        setError(undefined);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
        setData(undefined);
      });
  }, [refresh]);

  return { isLoading, data, error };
};

export default useEthPrice;
