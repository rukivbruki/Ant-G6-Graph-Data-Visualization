import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

import { equipmentData } from '../../Data/equipmentData';
import styled from 'styled-components';

const TableWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 600px;
  justify-content: center;
`;

const TableTitle = styled.h2`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 600px;
  justify-content: center;
`;

const columns = [
  {
    title: 'Оборудование',
    dataIndex: 'equipment',
  },
  {
    title: 'Количество',
    dataIndex: 'number',
  },
  {
    title: 'Стадия',
    dataIndex: 'stage',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Производительность',
    dataIndex: 'value',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
];

const data = [
  {
    key: '1',
    equipment: 'John Brown',
    number: 2,
    stage: 98,
    value: 60,
  },
  {
    key: '2',
    equipment: 'John Brown',
    number: 2,
    stage: 98,
    value: 60,
  },
  {
    key: '3',
    equipment: 'John Brown',
    number: 2,
    stage: 98,
    value: 60,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export const MainTable = (props) => {
  const { transformedFormData, otherFormData } = props.state;
  const constructingTableData = (transformedFormData) => {
    const tableData = [];
    transformedFormData.forEach((item) => {
      for (let i = 0; i < item.length; i++) {
        const obj = {};
        obj.equipment = item[i][0];
        obj.value = item[i][1];
        obj.stage = equipmentData.get(item[i][0]).stageName;
        obj.number = item[i][3];
        tableData.push(obj);
      }
    });
    return tableData;
  };

  const tableData = constructingTableData(transformedFormData);
  console.log('СМОТРИМ дату', otherFormData[0]);
  return (
    <TableWrapper>
      <TableTitle>{`${otherFormData[1] || ' '} от ${
        otherFormData[0]
      }`}</TableTitle>
      <Table
        columns={columns}
        dataSource={tableData || data}
        onChange={onChange}
      />
    </TableWrapper>
  );
};
