import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import { PeopleList, Person } from "./types";
import useFetch from "./useFetch";

const App = () => {
  const swapiUrl = "https://swapi.dev/api/people";
  const title = "STAR WARS People";

  const [url, setUrl] = useState(swapiUrl);
  const [selectedModel, setSelectedModel] = useState<Person>();
  const [modelList, setModelList] = useState<PeopleList>();

  const [modelFilms, setModelFilms] = useState<any[]>([]);

  const { data, loading, error, sendRequest, reqType } = useFetch();

  /**
   * Get the people data each time url changes.
   */
  useEffect(() => {
    sendRequest(url, "list");
  }, [url, sendRequest]);

  /**
   * React to list or details retrieved data.
   */
  useEffect(() => {
    if (!loading && !error && data) {
      switch (reqType) {
        case "list": {
          setModelList(data);
          break;
        }
        case "details": {
          setSelectedModel(data);
          break;
        }
        default:
          break;
      }
    }
  }, [data, loading, error, reqType]);

  /**
   * Fetches the next/previous list of people.
   */
  const paginatorHandler = useCallback(
    (url: string) => {
      sendRequest(url, "list");
    },
    [sendRequest]
  );

  /**
   * Fetches the person details.
   */
  const getPersonData = useCallback(
    (personUrl: string) => {
      sendRequest(personUrl, "details");
    },
    [sendRequest]
  );

  return (
    <div className="App">
      <div className="header">
        <h2>{title}</h2>
        <div className="loading-container">{loading && "Loading..."}</div>
      </div>

      <div className="error-container">
        {error && "Something went wrong..."}
      </div>

      {modelList && (
        <div>
          <ul className="no-bullets">
            {modelList.results.map((model: any) => (
              <li
                key={model.url}
                title={`See ${model.name} details`}
                className="person"
                onClick={() => getPersonData(model.url)}
              >
                {model.name}
              </li>
            ))}
          </ul>
          <div className="list-footer">
            <div className="paginator-buttons">
              {modelList?.previous ? (
                <button
                  onClick={() =>
                    paginatorHandler(
                      modelList.previous ? modelList.previous : ""
                    )
                  }
                >
                  {"<"}
                </button>
              ) : (
                <div></div>
              )}
              {modelList?.next ? (
                <button
                  onClick={() =>
                    paginatorHandler(modelList.next ? modelList.next : "")
                  }
                >
                  {">"}
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedModel && (
        <div className="model-details">
          <h3>Details:</h3>
          <button
            className="close-details"
            onClick={() => setSelectedModel(undefined)}
          >
            x
          </button>
          <div className="model-details__container">
            <div className="details__data">
              <b>Name:</b> {selectedModel.name}
            </div>
            <div className="details__data">
              <b>birth_year:</b> {selectedModel.birth_year}
            </div>
            <div className="details__data">
              <b>gender:</b> {selectedModel.gender}
            </div>
            <div className="details__data">
              <b>mass:</b> {selectedModel.mass}
            </div>
            <div className="details__data">
              <b>Eye color:</b> {selectedModel.eye_color}
            </div>
            <div className="details__data">
              <b>Hair color:</b> {selectedModel.hair_color}
            </div>
            <div className="details__data">
              <b>Skin color:</b> {selectedModel.skin_color}
            </div>
          </div>
          <div className="close-details">
            <button onClick={() => setSelectedModel(undefined)}>x</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
