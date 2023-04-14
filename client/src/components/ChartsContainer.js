import React, { useState } from 'react';
import AreaChart from './AreaChart';
import BarChartComponent from './BarChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useAppContext } from '../context/appContext';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        className='btn'
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? 'Click for Area Chart' : 'Click for bar chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
