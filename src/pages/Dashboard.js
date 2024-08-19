import React, { useEffect, useState } from 'react';
import { Grid, styled, Paper } from '@mui/material';

import PieChart from '../components/PieChart';
import { useDashboard } from '../contexts/DashboardContext';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const ItemDash = ({ label, values }) => {
  return (
    <Grid item xs={4}>
      <Item>
        <h5>{label}</h5>
        <PieChart data={values} />
      </Item>
    </Grid>
  )
}

export default function Dashboard({ id }) {

  const { loading, dashboard: dashboardData, getDashboard } = useDashboard();
  const [chartDataPerState, setChartDataPerState] = useState({ series: [], labels: [] });
  const [chartDataPerCultures, setChartDataPerCultures] = useState({ series: [], labels: [] });
  const [chartDataPerSoil, setChartDataPerSoil] = useState({ series: [], labels: [] });

  useEffect(() => {
    getDashboard(id);
  }, []);

  useEffect(() => {
    const { farmsByState, farmsByCulture, landUse } = dashboardData;
    if (farmsByState) {
      const newData = {
        series: farmsByState.map((item) => parseInt(item.count)),
        labels: farmsByState.map((item) => item.state),
      };
      setChartDataPerState(newData);
    }

    if (farmsByCulture) {
      const newData = {
        series: farmsByCulture.map((item) => parseInt(item.count)),
        labels: farmsByCulture.map((item) => item.name),
      };
      setChartDataPerCultures(newData);
    }

    if (landUse) {
      const newData = {
        series: [
          parseInt(landUse.agriculturalarea),
          parseInt(landUse.vegetationarea),
        ],
        labels: [
          'Área agricultável',
          'Vegetação',],
      };
      setChartDataPerSoil(newData);
    }
  }, [dashboardData]);

  return (
    <div>
      {loading
        ? 'Carregando...'
        :
        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} rowSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={12}>
            <Item>
              <h2>Total de fazendas: {dashboardData?.totalFarms || 0}</h2>
              <h2>Total em Hectares: {dashboardData?.totalArea || 0}</h2>
            </Item>
          </Grid>
          <ItemDash label="Distribuição por Estado" values={chartDataPerState} />
          <ItemDash label="Distribuição por Cultura" values={chartDataPerCultures} />
          <ItemDash label="Distribuição por Uso de Solo" values={chartDataPerSoil} />
        </Grid>
      }
    </div>
  );
}
