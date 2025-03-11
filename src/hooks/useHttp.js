import { useCallback, useEffect, useState } from "react";

const fetchRequest = async (url, config) => {
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Something went wrong");
  }
  return responseData;
};

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const clearData = () => setData(initialData);

  const sendRequest = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const results = await fetchRequest(url, { ...config, body: data });
      setData(results);
    } catch (error) {
      setError({ ...error, message: error.message || "Something went terribly wrong :(" });
    }
    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if (!config || !config.method || (config && config.method === "GET")) {
      sendRequest();
    }
  }, [sendRequest]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
};

export default useHttp;
