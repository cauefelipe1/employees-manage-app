import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import NotFound from "../components/NotFound";
import DefinitionSearchBox from "../components/DefinitionSearchBox";
import useFetch from "../hooks/UseFetch";

export default function Definition(){
    const { search } = useParams();

    const [word, errorStatus] = useFetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search);

    useEffect(() => {
        console.log(word);
    });

    if (errorStatus === 404){
        return (
            <>
                <NotFound />
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    if (errorStatus){
        return (
            <>
                <p>Something went wrong, try again?</p>
                <Link to="/dictionary">Search another</Link>
            </>
        );
    }

    return (
        <>
           {word?.[0]?.meanings ? 
                <>
                    <h1>Here is a definition for: {search}</h1>

                    {(word[0].meanings.map((meaning) => {
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