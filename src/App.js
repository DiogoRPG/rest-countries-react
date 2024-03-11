import { BrowserRouter, Routes, Route} from "react-router-dom";

import Countries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Countries />} />
      <Route path="/:countryName" element={<CountryInfo />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
