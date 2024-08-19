import React, { useCallback } from 'react';
import { useProducers } from '../contexts/ProducersContext';
import { Screen, ProducerForm } from '../components';
import { useNavigate } from 'react-router-dom';

export default function CreateProducer() {

    const navigate = useNavigate();
    const { addProducer } = useProducers();

    const handleCreateProducer = useCallback(async (newProducerData) => {
        try {
            await addProducer(newProducerData);

            navigate('/');
        } catch (error) {
            console.error('Erro ao criar produtor:', error);
        }
    }, [addProducer, navigate]);


    const initialProducerData = {
        cpf_cnpj: '',
        nome_produtor: '',
        fazendas: [
            {
                nome_fazenda: '',
                cidade: '',
                estado: '',
                area_total: '',
                area_agricultavel: '',
                area_vegetacao: '',
                culturas: []
            }
        ],
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
