import { TopLogo } from "../Misc/TopLogo"
import { Navigation } from "../Misc/Navigation"
import { ShowCustomers } from "./ShowCustomers"
import { ShowRecipes } from "./ShowRecipes"
import { ShowTips } from "./ShowTips"
import './Dashboard.css'

export function Dashboard(){
    return(
        <>
            <TopLogo/>
            <div className="Dashboard-Div">
                <div className="Box">
                    <Navigation></Navigation>
                    <div className="Dashboard">
                        <section className="Customers-Box">
                        <ShowCustomers/>
                        </section>
                        <div className="Dashboard-RepTip">
                        <section className="Recipes-Box">
                        <ShowRecipes/>
                        </section>
                        <section className="Tips-Box">
                        <ShowTips/>
                        </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}