import "./ingredients.css";
export default function Ingredients(props) {
    return (<>

        <div className="ingredients-list">
            {props.ingredients.length==0? "" : <h2>Ingredients</h2>}

            <ul>
                {props.ingredients.map((ingredient) => (
                    <li key={ingredient.index}>
                        {ingredient}
                    </li>
                ))}
            </ul>
        </div>

    </>)
}