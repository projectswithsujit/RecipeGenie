import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./recipeSection.css"

export default function RecipeSection({ list }) {

    const [click, setClicked] = useState(false)
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        setRecipe("Loading...")
        const getRecipe = async () => {
            try {
                const response = await fetch("https://server-zalb.onrender.com/recipe", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ingredients: list
                    }),
                });

                const data = await response.json();
                setRecipe(data.recipe)

            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        getRecipe();
    }, [click]);


    return (
        <>
            {list.length > 3 ? <div className="button-container">
                <button className="gen-recipe" onClick={() => { setClicked(!click) }}>
                    Generate Recipe
                </button>
            </div> : ""}

            {
                click && <div className="recipe-section">
                    <span className="recipe-badge">AI Generated Recipe</span>

                    <h2>Your Recipe</h2>

                    <div className="recipe-content">
                        <ReactMarkdown>
                            {recipe}
                        </ReactMarkdown>
                        {recipe && <a class="credit-link" href="https://www.sujitmishra.com.np" target="_blank">
                            Created by Sujit Mishra.
                        </a>}
                    </div>
                </div>
            }
        </>
    );
}
