import './DialogShowCustomer.css';
import { dataBase } from '../../../DataBase/Firebase';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';

/* eslint-disable react/prop-types */
export function DialogShowCustomer({ customer }) {
    const defaultPlan = {
        Calories: '',
        content: [''],
        startDate: ''
    };
    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState(defaultPlan);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const docRef = doc(dataBase, 'Plan', customer.plan_ID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    setLoading(false);
                } else {
                    console.log('No such document in Plan!');
                }
                
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };
        loadInitialData();
    }, [customer.plan_ID]);

    const changePlan = async () => {
        setLoading(true);
        setClicked(!clicked);
        try {
            if (!clicked) {
                const docRef = doc(dataBase, 'Record', customer.record_ID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const recordData = docSnap.data();
                    const anotherDocRef = doc(dataBase, 'Plan', recordData.plan_ID);
                    const anotherDocSnap = await getDoc(anotherDocRef);
                    if (anotherDocSnap.exists()) {
                        setData(anotherDocSnap.data());
                    } else {
                        console.log('No such document in Plan!');
                    }
                } else {
                    console.log('No such document in Record!');
                }
            } else {
                const planDocRef = doc(dataBase, 'Plan', customer.plan_ID);
                const planDocSnap = await getDoc(planDocRef);
                if (planDocSnap.exists()) {
                    setData(planDocSnap.data());
                } else {
                    console.log('No such document in Plan!');
                }
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
        setLoading(false);
    };

    return (
        <section className="Dialog-Box-Customer">
            <div id="Name-Dialog-Customer">
                <img src="User.png" alt="User" />
                <div>
                    <p>{customer.Name + ' ' + customer.LastName}</p>
                    <span>Objetivo: {customer.Goal} | IMC: {customer.IMC}</span>
                </div>
            </div>
            <div id="UserName-Dialog-Customer">
                <p>Usuario: {customer.UserName}</p>
                <p>Contraseña: <span>{customer.Password}</span></p>
            </div>
            <div id="AllergiesanPreferences-Dialog-Customer">
                <p>Alergias:</p>
                <p>{customer.Allergies.join(', ')}</p>
                <p>Preferencias:</p>
                <p>{customer.Preferences.join(', ')}</p>
            </div>

            {loading ? (
                <h1 style={{ textAlign: 'center' }}>No existe plan...</h1>
            ) : (
                <>
                    <p id="dateAssigned">
                        Calorías: {data.Calories} | Fecha asignada: {data.startDate}
                    </p>
                    <button id="Butoon-record" onClick={changePlan}>
                        {clicked ? 'Actual' : 'Anterior'}
                    </button>
                    <div id="Plan-Dialog-Customer">
                        <section>
                            {data.content?.map((day, index) => (
                                <li key={index} id="contentDay">
                                    Día {index + 1}
                                    <textarea readOnly rows="10" cols="25" defaultValue={day} />
                                </li>
                            ))}
                        </section>
                    </div>
                </>
            )}
        </section>
    );
}