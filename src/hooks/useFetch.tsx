import { useState, useCallback } from "react";

import { ReqType } from "../types";

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

  const sendRequests = useCallback((urls: string[], requestType: ReqType) => {
    setLoading(true);
    setError(false);
    setReqType(requestType);

    const promises: Promise<any>[] = [];

    urls.map((url) => {
      const promise = fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            // setError(true);
            console.log(res.error);
          } else {
            // setData(res);
            return res;
          }
        })
        .catch((err) => {
          // setError(true);
          console.log(err);
          return err;
        });

      promises.push(promise);
    });

    Promise.all(promises)
      .then((result) => {
        console.log("resultados obtenidos en grupo");
        console.log(result);
        setData(result);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error, sendRequest, reqType, sendRequests };
};

export default useFetch;
