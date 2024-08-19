import React, { useCallback, useEffect, useState } from 'react';
import { useProducers } from '../contexts/ProducersContext';
import { Screen, ProducerForm } from '../components';
import { useNavigate } from 'react-router-dom';

export default function CreateProducer() {

    const navigate = useNavigate();
    const [newId, setNewId] = useState(null);
    const { addProducer } = useProducers();

    useEffect(() => {
        if (!newId) return
        navigate(`/edit/${newId}`)
    }, [newId]);

    const handleCreateProducer = useCallback(async (newProducerData) => {
        try {
            await addProducer(newProducerData).then(id => setNewId(id));
        } catch (error) {
            console.error('Erro ao criar produtor:', error);
        }
    }, [addProducer, navigate]);


    const initialProducerData = {
        cpf_cnpj: '',
        nome_produtor: '',
        fazendas: [],
    };

    return (
        <Screen title="Criar Produtor">
            <ProducerForm
                initialProducerData={initialProducerData}
                onSubmit={handleCreateProducer}
            />
        </Screen>
    );
}
