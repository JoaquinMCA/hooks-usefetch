import { useState, useCallback } from "react";
import { ReqType } from "./types";

const useFetch = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reqType, setReqType] = useState<ReqType>();

  const sendRequest = useCallback((url: string, requestType: ReqType) => {
    setLoading(true);
    setError(false);
    setReqType(requestType);
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(true);
        } else {
          setData(res);
        }
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error, sendRequest, reqType };
};

export default useFetch;
