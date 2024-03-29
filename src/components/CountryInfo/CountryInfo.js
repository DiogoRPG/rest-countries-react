import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import { apiURL } from "../../util/api";
import { Link } from "react-router-dom"

export default function CountryInfo() {
    const [country, setCountry] = useState([]);
    const { countryName } = useParams();

    const getCountryByName = async() => {
        try {
            const response = await fetch(`${apiURL}/name/${countryName}`)
            if (!response.ok) throw new Error("Could not found!");

            const data = await response.json();
            setCountry(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getCountryByName();
    }, [countryName])
    return (
        <>
          <section className="p-8 md:py-0 max-w-7xl mx-auto">
            {country.map((item) => (
              <div
                key={item.population}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
              >
                <article>
                  <img src={item.flags.svg} alt={item.name.common} />
                </article>
    
                <article>
                  <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl">
                    {item.name.official}
                  </h1>
    
                  <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                    <li>Capital: {item.capital[0]}</li>
                    <li>Population: {item.population.toLocaleString()}</li>
                    <li>Region: {item.region}</li>
                    <li>Subregion: {item.subregion}</li>
                    <li>Currencies: {
                                  new Intl.ListFormat(undefined, {
                                  style: "long",
                                  type: "conjunction",
                                  }).format(Object.values(item.currencies).map((c) => c.name))
                                }
                      </li>
                  </ul>
                  {item.borders && (
                    <>
                      <h3 className="text-gray-900 font-bold text-lg mb-2 dark:text-white">
                        Borders:
                      </h3>
                      <ul className="flex flex-wrap items-start justify-start gap-2">
                        {item.borders.map((border, index) => (
                          <li
                            key={index}
                            className="bg-white p-2 rounded text-xs tracking-wide shadow dark:bg-gray-800 dark:text-gray-400 text-gray-700"
                          >
                            {border}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                
                <Link to="/" 
                className="inline-block mt-8 bg-white py-2 px-6 rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400"
                 >&larr; Back</Link>
                </article>
              </div>
            ))}
          </section>
        </>
      );
}
