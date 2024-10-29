import { createContext, useContext, useState, useEffect } from "react";
//const BASE_URL = "https://wendy2022.github.io/mock-data/cities.json";
const BASE_URL = "http://localhost:9000/cities";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);
        if (!res.ok) {
          throw new Error("can not get the data");
        }
        const data = await res.json();
        //setCities(data.cities);
        setCities(data);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) {
        throw new Error("can not get current city");
      }
      const data = await res.json();
      //setCurrentCity(data.cities);
      setCurrentCity(data);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      //setCurrentCity(data.cities);
      //setCurrentCity(data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error creating data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      //setCurrentCity(data.cities);
      //setCurrentCity(data);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("There was an error deleting data...");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
}
export { CitiesProvider, useCities };
