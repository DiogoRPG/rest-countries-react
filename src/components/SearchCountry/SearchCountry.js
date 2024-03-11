import React, {useState} from 'react'

export default function SeacrhInput (onSearch) {
    const [input, setInput] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        onSearch(input)
    }

  return (
    <>
    <form 
    onSubmit={submitHandler}
    autoComplete='off'
    className='max-w-4x1 md:flex-1'
    >
        <input 
            type="text" 
            name='search'
            placeholder="Search for a country by its name."
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none"
        />
    </form>
    </>
  );
};


  {/* <form  autoComplete="off" className="max-w-4x1 md:flex-1">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for a country by its name"
                        required
                        className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow
                        rounded outline-none"
                    ></input>
                </form> */}