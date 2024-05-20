import './Navigation.css'
import { useNavigate } from "react-router-dom";

export function Navigation(){
    const pages = {
        Home: '/DashBoard',
        AddCustomer: '/AddCustomer',
        AddRecipe: '/AddRecipe',
        AddPlan: '/AddPlan'
    }
    const navigate = useNavigate();

    return(
    <>
    <section className="Navigation">
        <aside>
        <div>
        <button className="mainButton" onClick={() => {navigate(pages.Home)}}>
        <img src="Home.png" alt="Inicio"/>
            Inicio
        </button>
        </div>
        <div>
        <button className="mainButton" onClick={() => {navigate(pages.AddCustomer)}}>
        <img src="UserAdd.png" alt="Añadir Cliente"/>
            Añadir cliente
        </button>
        </div>
        <div>
        <button className="mainButton" onClick={() => {navigate(pages.AddRecipe)}}>
        <img src="RecipeAdd.png" alt="Añadir receta"/>
            Añadir receta
        </button>
        </div>
        <div>
        <button className="mainButton" onClick={() => {navigate(pages.AddPlan)}}>
        <img src="PlanAdd.png" alt="Añadir receta"/>
            Añadir Plan
        </button>
        </div>
        </aside>
    </section>
    </>
    )
}