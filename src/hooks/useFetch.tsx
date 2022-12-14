import { useState, useCallback } from "react";

import { ReqType } from "../types";

const useFetch = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
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
    let i = 0;
    urls.map((url) => {
      const promise = fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            setError(true);
            setErrors((prevValue) => {
              return [...prevValue, res.status + "-" + res.statusText];
            });
          }
        })
        .then((res) => {
          if (res?.error) {
            setError(true);
            setErrors((prevValue) => {
              return [...prevValue, error];
            });
          } else {
            return res;
          }
        })
        .catch((err) => {
          setError(true);
          setErrors((prevValue) => {
            return [...prevValue, err];
          });
        });

      promises.push(promise);
      i++;
    });

    Promise.all(promises)
      .then((result) => {
        setData(result.filter((res) => res !== undefined));
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error, sendRequest, reqType, sendRequests, errors };
};

export default useFetch;
