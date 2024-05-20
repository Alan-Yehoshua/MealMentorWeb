import './DialogUpdateCustomer.css'
import { updateDocID } from '../../Hooks/updateDocID';
import CryptoJS from 'crypto-js';

/* eslint-disable react/prop-types */
export function DialogUpdateCustomer({customer}){
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new window.FormData(event.target));
        fields.Allergies = fields.Allergies.split(/,\s*|\s*y\s*/);
        fields.Preferences = fields.Preferences.split(/,\s*|\s*y\s*/);
            if(fields.Password != customer.Password)
                {
                    const passwordWithSalt = fields.Password+customer.Salt;
                    const passHash = CryptoJS.SHA256(passwordWithSalt).toString(CryptoJS.enc.Hex)
                    fields.Password = passHash
                }
        updateDocID(fields, 'Customers',customer.id);
    }

    return(
        <>
            <div className="Dialog-Update-Customer">
                <h1>Actualizar datos de {customer.Name + ' ' + customer.LastName}</h1>
                <form onSubmit={handleSubmit}>
                    <section id="Top-Dialog-Update">
                        <input defaultValue={customer.Name} name='Name'/>
                        <input defaultValue={customer.LastName} name='LastName'/>
                        <input defaultValue={customer.Goal} name='Goal'/>
                    </section>
                    <section id="Mid-Dialog-Update">
                        <input defaultValue={customer.UserName} name='UserName'/>
                        <input defaultValue={customer.Password} name='Password'/>
                        <input defaultValue={customer.IMC} name='IMC'/>
                    </section>
                    <section id="Bot-Dialog-Update">
                        <input defaultValue={customer.Allergies} name='Allergies'/>
                        <input defaultValue={customer.Preferences} name='Preferences'/>
                    </section>
                    <section id="Submit-Dialog-Update">
                        <input type='submit' value='Actualizar'/>
                    </section>
                </form>
            </div>
        </>
    );
}