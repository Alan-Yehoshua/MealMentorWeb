import { TopLogo } from '../Misc/TopLogo'
import { Navigation } from '../Misc/Navigation'
import { ShowCustomersAP } from './ShowCustomerAP'

import './AddPlan.css'

export function AddPlan(){

    return(
        <>
        <TopLogo/>
        <div className='PlanDiv'>
            <div className='Box'>
                <Navigation/>
                    <section className='customerPlan'>
                        <ShowCustomersAP/>
                    </section>
            </div>
        </div>
        </>
    )
}