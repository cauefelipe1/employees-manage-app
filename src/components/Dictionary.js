import { useState, useEffect } from "react";

export default function Dictionary() {
    const [word, setWord] = useState("");
    const [test, setTest] = useState("");

    useEffect(() => {
        console.log('Word state updated ' + word)
    }, [word]);

    useEffect(() => {
        console.log('Test state updated ' + test)
    }, [test]);

    return (
        <>
            <input 
                type="text" 
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {

                    setWord(e.target.value);
            }}/>

            <input 
                type="text" 
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                    setTest(e.target.value);
            }}/>

            <h1>Let's get the definition for {word}</h1>
            <h1>Let's get the definition for {test}</h1>
        </>
    );
}