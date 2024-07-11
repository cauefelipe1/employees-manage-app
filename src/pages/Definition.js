import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import NotFound from "../components/NotFound";

export default function Definition(){
    const navigate = useNavigate();

    const [word, setWord] = useState();
    const [notFound, setNotFound] = useState(false);
    let { search } = useParams();

    useEffect(() => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
            .then((response) => {
                if (response.status === 404) {
                    setNotFound(true);
                }

                return response.json()
            })
            .then((data) => {
                if (data && Array.isArray(data) && data.length > 0 && data[0].meanings) {
                    setWord(data[0].meanings);
                }
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
                </>
            :
                <p>Loading...</p>
            }
        </>
    );
}