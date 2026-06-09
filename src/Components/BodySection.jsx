import { useState } from "react"
import Ingredients from "./ingredients"
import RecipeSection from "./RecipeSection"
import Footer from "./Footer"
export default function BodySection() {

    // Ingredients array
    const [list, setList] = useState([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [clicked, setClicked] = useState(false)
    // submit form action
    function formSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newIngredient = formData.get("ingredient")
        if (newIngredient.trim() != "") {
            if (!list.includes(newIngredient)) {
                setError(false)
                setErrorMessage()
                setList(prev => [...prev, newIngredient]);
            }
            else {
                setError(true)
                setErrorMessage(`${newIngredient} already in the receipe book`)
            }
        }
        else {
            setError(true)
            setErrorMessage(`you can't add empty field`)
        }
        console.log(list);
    }



    return (<div className="body-section">


        <form onSubmit={formSubmit}>
            <input
                type="text"
                name="ingredient"
                placeholder="eg. potato"
                aria-label="Add ingredient"
                className="input-data"
            />
            {
                error ? <p className="error-message">
                    {errorMessage}
                </p> : ""
            }
            <button className="add-ind">
                Add Ingredient
            </button>

        </form>

            {
                list.length>0 ? <button className="gen-recipe" onClick={()=>{setList([])}}>
                Clear List
            </button> : ""
            }

        {/* ingredients list */}
        {list.length == 0 ? "" : <Ingredients ingredients={list} />}

        {
            list.length > 0 && list.length < 4 ? <p className="atleast-message">
                Add atleast 4 ingredients
            </p> : ""
        }

        { <RecipeSection list={list}/> }


        <Footer />
    </div>)
}
