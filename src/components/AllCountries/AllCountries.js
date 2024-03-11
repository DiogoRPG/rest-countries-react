import React, {useState, useEffect} from "react";

import { apiURL } from "../../util/api";

import Article from "../Article/Article";

import SeacrhInput from "../SearchCountry/SearchCountry";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searchText, setSearchText] = useState("");

    const regions = [
        {
            name: "Europe",
        },
        {
            name: "Asia",
        },
        {
            name: "Africa",
        },
        {
            name: "Americas",
        },
        {
            name: "Antarctic",
        },
    ]

    const getAllCountries = async() => {
        try {
            const response = await fetch(`${apiURL}/all`);
            if(!response.ok) throw new Error("Something went wrong!");

            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getAllCountries();
    }, [])

    async function searchCountry() {
        try {
            const response = await fetch(`${apiURL}/name/${searchText}`);
            if(!response.ok) throw new Error("Not Found any country!");

            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function filterByRegion(region) {
        try {
            const response = await fetch(`${apiURL}/region/${region}`)
            if(!response.ok) throw new Error("Failed...");

            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleSearchCountry(e) {
        e.preventDefault()
        searchCountry()
    }

    function handleFilterByRegion(e) {
        e.preventDefault()
        filterByRegion()
    }

    return (
        <>
            {!countries ? (
            <h1 className="text-gray-900 font-bolf uppercase tracking-wide flex items-center
             justify-center text-center h-screen text-4x1">
                Carregando...
            </h1>
           ) : (
           <section className="container mx-auto p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <form  
                onSubmit={handleSearchCountry}
                autoComplete="off" 
                className="max-w-4x1 md:flex-1"
                    >
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for a country by its name"
                        required
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow
                        rounded outline-none"
                    ></input>
                </form>
                <form onSubmit={handleFilterByRegion}>
                    <select 
                        name="filter-by-region" 
                        id="filter-by-region" 
                        className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600"
                        value={regions.name}
                        onChange={e => filterByRegion(e.target.value)}
                        >
                            {regions.map((region, index) => (
                                <option key={index} value={region.name}>
                                    {region.name}
                                </option>
                            ))}
                    </select>
                </form>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-3">
            {countries.map((country) => (
                <Article key={country.name.common} {...country}/>
            ))}
            </div>
           </section>
           )}
        </>
    );
};