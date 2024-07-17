import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import NotFound from "../components/NotFound";
import DefinitionSearchBox from "../components/DefinitionSearchBox";

export default function Definition(){
    const navigate = useNavigate();
    const location = useLocation();

    const [word, setWord] = useState();
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const { search } = useParams();

    useEffect(() => {
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true);

                } else if (response.status === 401) {
                    navigate("/login", {
                        state: {
                            previousUrl: location.pathname
                        }
                    })

                } else if (response.status === 500) {
                    //setServerError(true);
                }

                if (!response.ok) {
                    setError(true);

                    throw new Error("something went wrong.");
                }

                return response.json()
            })
            .then((data) => {
                if (data && Array.isArray(data) && data.length > 0 && data[0].meanings) {
                    setWord(data[0].meanings);
                }
            })
            .catch((e) => {
                console.log(e.message)
            });
        
    }, [search, navigate]);

    if (notFound){
        return (
            <>
                <NotFound />
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    if (error){
        return (
            <>
                <p>Something went wrong, try again?</p>
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    return (
        <>
           {word && Array.isArray(word) ? 
                <>
                    <h1>Here is a definition for: {search}</h1>

                    {(word.map((meaning) => {
                        return (
                            <p key={uuidv4()}>
                                {meaning.partOfSpeech}: {meaning.definitions[0].definition}
                            </p>)
                    }))}

                    <p>Search again:</p>
                    <DefinitionSearchBox />
                </>
            :
                <p>Loading...</p>
            }
        </>
    );
}