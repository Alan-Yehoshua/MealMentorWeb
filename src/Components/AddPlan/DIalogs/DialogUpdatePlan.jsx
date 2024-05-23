import { makeArray } from "../../Logic/makeArray"
import { useState, useRef } from 'react';

import { dataBase } from '../../../DataBase/Firebase';
import { doc, updateDoc} from "firebase/firestore"

import { useDoc } from "../../Hooks/useDoc";

/* eslint-disable react/prop-types */
export function DialogUpdatePlan({customer}){
  const currentDate = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(true)

  const form = useRef()

  const {data} = useDoc(dataBase, 'Plan', customer.plan_ID, setLoading);

    const handleSubmit = (event) =>{
        event.preventDefault();
        let daysArray = makeArray(1,8,'Day',event);
        const fields = Object.fromEntries(new window.FormData(event.target));
        for(let i = 1; i<=daysArray.length;i++){
            delete fields['Day'+i]
        }
        fields.content = daysArray;

        (async() => {
            try {
                const docRef = doc(dataBase, 'Plan', customer.plan_ID);
                await updateDoc(docRef, fields);
                alert("Plan actualizado correctamente");
                form.current.reset();
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        })();
        
    }
    
    const arrayDays = Array(7).fill(null)

    return(
        <section id="Box-Dialog-Plan">
        <h1>Actualizar Plan de {customer.Name + ' ' + customer.LastName}</h1>
            <form onSubmit={handleSubmit} id='form-box' ref={form}>
                {loading ? <p style={{textAlign: 'center'}}>No existe Plan...</p> :
                <>
                <input
                type='number'
                defaultValue={data.Calories}
                name='Calories'/>
                <section id="Form-Dialog-Plan">
                {arrayDays.map((index, day=1) => (
                    <>
                    <li id='textarea-box' key={index}>
                    <label>Dia {day+=1}</label>
                    <textarea
                    name={'Day'+day}
                    autoCapitalize="sentences" 
                    autoComplete="on"
                    autoFocus
                    defaultValue={data.content[day-1]}
                    id="textarea-day">
                    </textarea>
                    </li>
                    </>
                ))}
                <div id='date-box'>
                <label>Inicio de plan</label>
                <input
                name='startDate'
                type='date'
                id='date-plan'
                pattern="\d{4}-\d{2}-\d{2}"
                min={currentDate}
                defaultValue={data.startDate} 
                />
                </div>
                <input 
                type='submit' 
                value='Actualizar'
                id='submit-button-plan'
                />
                </section>
                </>
            }
            </form>
        </section>
    );
}