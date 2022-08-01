import "./App.css";
import { Route, Routes } from "react-router-dom";
import CountryDetail from "./components/countryDetail/countryDetail";
import CreateActivity from "./components/createActivity/createActivity";
import Landing from "./components/landing/landing";
import Countries from "./components/countries/countries";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/country" element={<Countries />} />
        <Route path="/country/:id" element={<CountryDetail />} />
        <Route path="/create" element={<CreateActivity />} />
      </Routes>
    </div>
  );
}

export default App;
