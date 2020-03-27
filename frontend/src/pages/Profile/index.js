import React, {useEffect, useState} from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function Profile(){

    const[incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    async function handleLogout(){
        localStorage.clear(); 
        history.push('/');     
    }
    
    return (
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem vinda, {ongName}</span>

                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    <button onClick={() => {handleLogout()}} type="button">
                        <FiPower size={18} color="#e02041" />
                    </button>
                </header>   

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>    
                        <strong>Caso:</strong>
                        <p>{incidents.title}</p>

                        <strong>Descrição</strong>
                        <p>{incidents.description}</p>

                        <strong>Valor</strong>
                        <p>{incidents.value}</p>

                        <button onClick={() => handleDeleteIncident(incidents.id)} type="button" >
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>

            </div>
    );    
}