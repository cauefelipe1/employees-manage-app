import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefinitionSearchBox from "../components/DefinitionSearchBox";

export default function Dictionary() {
    const [word, setWord] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <DefinitionSearchBox />
        </div>
    );
}