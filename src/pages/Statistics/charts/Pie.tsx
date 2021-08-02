import React  from 'react';
import {Pie} from '@ant-design/charts';

interface Props {
  data: { type: string, value: number }[]
}

const DemoPie: React.FC<Props> = (props) => {
  const config = {
    width:500,
    appendPadding: 10,
    data: props.data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{type: 'pie-legend-active'}, {type: 'element-active'}],
  };
  return <Pie {...config}/>;
};

export default DemoPie;
