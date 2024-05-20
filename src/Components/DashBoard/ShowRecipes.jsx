import { useState } from "react";
import { DialogShowRecipe } from "./Dialog/DialogShowRecipe";
import { DialogUpdateRecipe } from "./DialogUpdate/DialogUpdateRecipe";

import { dataBase } from '../../DataBase/Firebase';
import { useDocs } from "../Hooks/useDocs";

import ReactDOM from 'react-dom';
import './ShowRecipes.css'


export function ShowRecipes(){
    const [activeDialog, setActiveDialog] = useState({isOpen: false, type: null, recipe: null});
    const [loading, setLoading] = useState(false)

    const {data} = useDocs(dataBase, 'Recipe', setLoading);

    const showDialog = (type, recipe) => {
    setActiveDialog({isOpen: true, type, recipe})
    };
    
    const closeDialog = () => {
    setActiveDialog({isOpen: false, type: null, recipe: null})
    };

    const dialogContent = () => {
        const {type, recipe} = activeDialog;
        switch (type) {
            case 'ver':
                return <DialogShowRecipe recipe={recipe}/>
            case 'act':
                return <DialogUpdateRecipe recipe={recipe}/>
            default:
                return null;
        }
    };

    const dialog = activeDialog.isOpen && (
        <>
            <div className="overlay" onClick={closeDialog}></div>
            <dialog open className="customer-dialog">
                {dialogContent(activeDialog)}
                <button onClick={closeDialog} id="closeDialog">Cerrar</button>
            </dialog>
        </>
    );

    return(
        <>
            {ReactDOM.createPortal(dialog, document.body)}
            {loading ? <h1 style={{textAlign: 'center'}}>No existen recetas...</h1>:
            <ul id="ul-recipes">
            {data?.map((recipe) => (
                <li key={recipe.id}>
                    <section className="recipe-Box">
                        <img src="RecipeAdd.png" alt="img de recipe"/>
                        <div>
                            <p className="Title">{recipe.Title}</p>
                        </div>
                    </section>
                    <section className="box-left">
                        <div className="Circle" onClick={() => showDialog('ver', recipe)}><p>Ver</p></div>
                        <div className="Circle" onClick={() => showDialog('act', recipe)}><p>Act</p></div>
                    </section>
                </li>
            ))}
            </ul>
            }
        </>
    );
}