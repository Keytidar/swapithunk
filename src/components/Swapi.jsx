import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, fetchJson } from '../redux/swapiSlice';

const Swapi = () => {
  const [inputValue, changeInputValue] = useState(
    'https://swapi.info/api/films'
  );

  let data = useSelector((state) => state.swapi.data);

const inputItems = [
  { key: "films", api: "https://swapi.info/api/films" },
  { key: "people", api: "https://swapi.info/api/people" },
  { key: "planets", api: "https://swapi.info/api/planets" },
  { key: "species", api: "https://swapi.info/api/species" },
  { key: "vehicles", api: "https://swapi.info/api/vehicles" },
  { key: "starships", api: "https://swapi.info/api/starships" },
];


  const dispatch = useDispatch();

  return (
    <div className="container-lg">
      <pre
        className="border border-danger overflow-y-scroll bg-black text-start"
        style={{ height: '30rem' }}
      >
        {data ? JSON.stringify(data, null, 2) : ''}
      </pre>
      <form
        className="d-flex mb-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await dispatch(fetchJson(inputValue));
          // changeData(JSON.stringify(res.payload, null, 2))
          console.log(res.payload);
        }}
      >
        <input
          type="text"
          className="w-100 border-danger bg-black"
          placeholder="API field"
          value={inputValue}
          onChange={(e) => changeInputValue(e.target.value)}
        />
        <button className=" text-black rounded-0 border-start-0 rounded-end bg-danger">
          submit
        </button>
      </form>
      <div className="d-flex gap-3 justify-content-center">
        <button
          className="border border-danger text-danger"
          onClick={() => {
            dispatch(clearData());
          }}
        >
          Clear
        </button>
        <button
          className="border border-danger text-danger"
          onClick={async () => {
            if (data) {
              try {
                await navigator.clipboard.writeText(data);
                alert('copied successfully');
              } catch (err) {
                alert('copy error');
              }
            }
          }}
        >
          Copy
        </button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle bg-black h-100 border-danger text-danger"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            API's
          </button>
          <ul className="dropdown-menu bg-black border-danger">
            {inputItems.map((item, index) => (
              <li key={index}>
                <button
                  className="dropdown-item text-danger"
                  type="button"
                  onClick={() => {
                    changeInputValue(item.api);
                  }}
                >
                  {item.key}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Swapi;
