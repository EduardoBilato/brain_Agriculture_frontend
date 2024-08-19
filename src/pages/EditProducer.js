import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducers } from '../contexts/ProducersContext';
import { Screen, ProducerForm } from '../components';
import { Row } from '../components';

import Dashboard from './Dashboard';

export default function EditProducer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, getProducer, updateProducer } = useProducers();

  const [initialProducerData, setInitialProducerData] = useState(null);

  useEffect(() => {
    const fetchProducer = async () => {
      const producerData = await getProducer(id);
      setInitialProducerData(producerData);
    };

    fetchProducer();
  }, [id]);

  const handleUpdateProducer = useCallback(async (updatedProducerData) => {
    try {
      await updateProducer(id, updatedProducerData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar produtor:', error);
    }
  }, [id, updateProducer, navigate]);

  if (!initialProducerData && loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Screen title="Editar Produtor">
      {initialProducerData && (
        <>
          <ProducerForm
            initialProducerData={initialProducerData}
            onSubmit={handleUpdateProducer}
          />
          <Row>
            <Dashboard id={id} />
          </Row>
        </>
      )}
    </Screen>
  );
}
