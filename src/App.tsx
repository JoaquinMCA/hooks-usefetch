import React, { useState, useEffect, useCallback } from "react";

import { PeopleList, Person, PaginatorDirections } from "./types";
import { StringList } from "./components/string-list";
import useFetch from "./hooks/useFetch";

import "./styles.css";

const App = () => {
  const swapiUrl = "https://swapi.dev/api/people";
  const title = "STAR WARS People";

  const [url, setUrl] = useState(swapiUrl);
  const [selectedModel, setSelectedModel] = useState<Person>();
  const [modelList, setModelList] = useState<PeopleList>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPageDirection, setCurrentPageDirection] =
    useState<PaginatorDirections>("forwards");

  const { data, loading, error, sendRequest, reqType, sendRequests } =
    useFetch();

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
   * Set the current page when the new list is received.
   */
  useEffect(() => {
    if (!loading && !error && data) {
      switch (reqType) {
        case "list": {
          setCurrentPage((prevValue) => {
            return currentPageDirection === "backwards"
              ? (prevValue -= 1)
              : (prevValue += 1);
          });
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
    (url: string, direction: PaginatorDirections) => {
      setCurrentPageDirection(direction);
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
        <div className="loading-container">
          {loading && <span className="loading-dots">Loading</span>}
        </div>
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
            <div className="paginator">
              {modelList?.previous && (
                <button
                  onClick={() =>
                    paginatorHandler(
                      modelList.previous ? modelList.previous : "",
                      "backwards"
                    )
                  }
                >
                  {"<"}
                </button>
              )}

              <div className="paginator__page-numbers">
                {currentPage}/
                {Math.ceil(modelList.count / modelList.results.length)}
              </div>

              {modelList?.next ? (
                <button
                  onClick={() =>
                    paginatorHandler(
                      modelList.next ? modelList.next : "",
                      "forwards"
                    )
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
          <h3> Details: </h3>
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
            <div className="details__data">
              <StringList
                urls={selectedModel.films}
                nameProperty={"title"}
                title={"Films: "}
              />
            </div>
            <div className="details__data">
              <StringList
                urls={selectedModel.species}
                nameProperty={"name"}
                title={"Species: "}
              />
            </div>
            <div className="details__data">
              <StringList
                urls={selectedModel.starships}
                nameProperty={"name"}
                title={"Star ships: "}
              />
            </div>
            <div className="details__data">
              <StringList
                urls={selectedModel.vehicles}
                nameProperty={"name"}
                title={"Vehicles: "}
              />
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
