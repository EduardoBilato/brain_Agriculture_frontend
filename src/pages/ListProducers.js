import React from 'react';
import { useProducers } from '../contexts/ProducersContext';
import { Screen, List, LinkButton } from '../components';

export default function ListProducers() {
    const { producers, loading } = useProducers();
    return (
        <Screen title="Produtores Cadastrados">
            {loading ? (
                'Carregando...'
            ) : (
                <List list={producers} />
            )}

            <LinkButton variant="contained" color='success' url={`/create`} label="Adicionar Produtor" />

        </Screen>
    );
}
