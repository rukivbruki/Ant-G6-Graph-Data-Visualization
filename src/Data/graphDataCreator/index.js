import { formData2 } from '../initialGraphData';
import _ from 'lodash';
import G6 from '@antv/g6';

import { EdgeCreator, NodeCreator } from './constructors';
import { stageNumberComparator } from './stageNumberComparator';

const makePreCleaningNodes = (equipmentNumber) => {
  console.log('ПОПАЛИ PreCleaning');
  let id = 'PreCleaning-' + equipmentNumber;
  let x = '';
  let y = -200 + (equipmentNumber + 1) * 95;
  let size = '';
  let type = 'rect';
  let label = 'Предочистка';
  const preCleaningObj = new NodeCreator(id, x, y, type, size, label);
  formData2.nodes.push(preCleaningObj);
};

const makeMechanicalNodes = (equipmentNumber) => {
  console.log('ПОПАЛИ MechanicalСleaning');
  let id = 'MechanicalСleaning-' + equipmentNumber;
  let x = '';
  let y = 10 + (equipmentNumber + 1) * 95;
  let size = '';
  let type = 'circle';
  let label = 'Механическая очистка';
  const MechanicalCleaning = new NodeCreator(id, x, y, type, size, label);
  formData2.nodes.push(MechanicalCleaning);
};

const makePreCleaningEdges = (equipmentNumber) => {
  let source = 'PreCleaning-' + equipmentNumber;
  let target = 'MechanicalСleaning-' + equipmentNumber;
  let type = 'polyline';
  let style = {
    startArrow: false,
  };
  const FirstEdges = new EdgeCreator(source, target, type, style);
  formData2.edges.push(FirstEdges);
};

const makeTankNodes = (equipmentNumber) => {
  console.log('ПОПАЛИ TankFarm');
  let id = 'TankFarm-' + equipmentNumber;
  let x = '';
  let y = -200 + (equipmentNumber + 1) * 95;
  let size = 30;
  let type = 'diamond';
  let label = 'Баковое хозяйство';
  const preCleaningObj = new NodeCreator(id, x, y, type, size, label);
  formData2.nodes.push(preCleaningObj);
};

const makeMechanicalEdges = (equipmentNumber) => {
  let source = 'MechanicalСleaning-' + equipmentNumber;
  let target = 'TankFarm-' + equipmentNumber;
  let type = 'cubic-horizontal';
  let style = {
    startArrow: false,
    endArrow: {
      path: G6.Arrow.diamond(10, 10, 5),
      d: 5,
    },
  };
  const SecondEdges = new EdgeCreator(source, target, type, style);
  formData2.edges.push(SecondEdges);
};

const makeMechanicalNeighborEdges = (equipmentNumber) => {
  let source = 'MechanicalСleaning-' + (equipmentNumber - 1);
  let target = 'MechanicalСleaning-' + equipmentNumber;
  let type = 'polyline';
  let style = {
    lineDash: [5, 5],
    startArrow: false,
    endArrow: {
      path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
      fill: '#02286c',
    },
  };
  const neighborEdges = new EdgeCreator(source, target, type, style);
  formData2.edges.push(neighborEdges);
};

export const graphDataCreator = (transformedFormData) => {
  formData2.nodes.length = 0;
  formData2.edges.length = 0;

  for (let stage of transformedFormData) {
    stage.forEach((equipment) => {
      _.range(equipment[3]).forEach((item, i) => {
        switch (equipment[2]) {
          case 'PreCleaning':
            makePreCleaningNodes(i);
            break;
          case 'MechanicalСleaning':
            makeMechanicalNodes(i);
            makePreCleaningEdges(i);
            break;
          case 'TankFarm':
            makeTankNodes(i);
            makeMechanicalEdges(i);
            break;
        }
        if (stageNumberComparator(transformedFormData, 0, 1)) {
          makeMechanicalNeighborEdges(i);
        }
      });
    });
  }
  return formData2;
};
