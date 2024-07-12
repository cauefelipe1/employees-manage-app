import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function DefinitionSearchBox(){
    const [word, setWord] = useState("");
    const navigate = useNavigate();

    return (
        <form 
            className="flex space-between space-x-2 max-w-[350px]"
            onSubmit={() => {
            navigate("/dictionary/" + word)
        }}>
            <input
                className="shirink  min-w-0 px-2 rounded py-1"
                placeholder="Dinossaur"
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);
                }}
            />

            <Button
                variant="outline-primary"
                className="block my-auto m-2">
                Search
            </Button>
        </form>
    );
}