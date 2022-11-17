import React, { useState, useEffect } from "react";

import useFetch from "../hooks/useFetch";

/**
 * Retrieves a series of models from the API and generates a string formed by one property (e.g. the name) of each model.
 */
export const StringList = (props: any) => {
  const [models, setModels] = useState<any[]>([]);
  const { data, loading, error, sendRequest, reqType, sendRequests } =
    useFetch();

  /**
   * Get the data data each time urls changes.
   */
  useEffect(() => {
    if (props.urls) {
      sendRequests(props.urls, "other");
    }
  }, [props.urls, sendRequests]);

  /**
   * Set the received list of models.
   */
  useEffect(() => {
    if (data && data.length > 0) {
      setModels(data);
    }
  }, [data, loading, error, reqType]);

  /**
   * Generates a string containing a list of properties from an array of objects.
   */
  const listNames = (list: any[], nameProperty: string) => {
    let names = "";
    for (let i = 0; i < list.length; i++) {
      names += list[i][nameProperty] ? list[i][nameProperty] : "";
      if (i < list.length - 1) {
        names += ", ";
      } else {
        names += ".";
      }
    }
    if (names === "") {
      names = "-";
    }
    return names;
  };

  return (
    <span>
      {models && (
        <div>
          <b>{props.title}</b>
          {loading && <span className="loading-dots"></span>}
          {!loading && data && listNames(models, props.nameProperty)}
        </div>
      )}
    </span>
  );
};

export default StringList;
