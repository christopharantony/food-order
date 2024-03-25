import { useCallback, useEffect, useState } from "react";

const ERROR_MESSAGE = "Sorry, something went wrong!";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData?.message || ERROR_MESSAGE);
  }
  return resData;
}
export default function useHttp(url, config, defaultData = null) {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearData = () => setData(defaultData);

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (config?.method === "GET" || !config?.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    clearData,
    isLoading,
    sendRequest,
  };
}
