import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import supabase from "./supabase"; // 确保这个路径正确

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // 获取所有城市
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const { data, error } = await supabase
          .from("cities")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  // 获取单个城市
  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const { data, error } = await supabase
          .from("cities")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  // 创建新城市
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const { data, error } = await supabase
        .from("cities")
        .insert([
          {
            cityName: newCity.cityName,
            country: newCity.country,
            emoji: newCity.emoji,
            date: new Date(newCity.date).toISOString(),
            notes: newCity.notes || "",
            position: newCity.position,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  // 删除城市
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const { error } = await supabase.from("cities").delete().eq("id", id);

      if (error) throw error;

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
