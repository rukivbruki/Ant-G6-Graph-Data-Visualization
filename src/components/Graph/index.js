import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../services/сontextCreater';
import { jsPDF } from 'jspdf';
import G6 from '@antv/g6';
import styled from 'styled-components';

import { Button } from 'antd';

const GraphContainer = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & Button {
    margin: 10px;
  }
`;

export function Graph() {
  const [graph, setGraph] = useState(null);
  const { state, dispatch } = useContext(Context);
  const graphData = state.graphData;
  console.log('Смотрим State из Graph', state);
  useEffect(() => {
    if (!graph) {
      const g = new G6.Graph({
        container: 'container',
        width: 900,
        height: 500,
        layout: {
          type: 'grid',
          begin: [0, 0],
          preventOverlap: true, // nodeSize or size in data is required for preventOverlap: true
          preventOverlapPdding: 20,
          nodeSize: 30,
          condense: false,
          rows: 5,
          cols: 5,
          sortBy: 'degree',
        },
        fitCenter: true,
        modes: {
          // behavior
          default: ['drag-node', 'drag-canvas'],
        },
        defaultNode: {
          type: 'circle',
          style: {
            fill: '#DEE9FF',
            stroke: '#5B8FF9',
          },
          linkPoints: {
            left: true,
            right: true,
            fill: '#fff',
            stroke: '#1890FF',
            size: 3,
          },
        },
        defaultEdge: {
          type: 'line-arrow',
          style: {
            startArrow: {
              path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
              fill: '#f61616',
            },
            endArrow: {
              path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
              fill: '#ff0000',
            },
          },
        },
      });
      g.data(graphData);
      g.render();
      setGraph(g);
    }
  }, [graph, setGraph, graphData]);

  useEffect(() => {
    if (graph) {
      graph.changeData(graphData);
    }
  }, [graphData, state, graph]);

  const downloads = {
    downloadPNG() {
      graph.toFullDataURL(
        (res) => {
          console.log(res);
          window.location.download = 'file.png';
          window.location.href = res;
        },
        [30, 15, 15, 15]
      );
    },

    downloadPDF() {
      graph.toFullDataURL((res) => {
        const doc = new jsPDF('p', 'mm');
        doc.addImage(res, 'PNG', 0, 0);
        doc.save('sample-file.pdf');
        console.log(res);
      });
    },

    saveGraph() {
      console.log('СМОТРИМ ДАННЫЕ ГРАФИКА: ', graph.save());
    },
  };

  return (
    <>
      <GraphContainer>
        <div id="container" />
      </GraphContainer>
      <ButtonContainer>
        <Button
          type="primary"
          style={{ marginRight: 'auto' }}
          onClick={downloads.saveGraph}
        >
          Сохранить график
        </Button>
        <Button type="primary" onClick={downloads.downloadPDF}>
          Загрузить в JPG
        </Button>
        <Button type="primary" onClick={downloads.downloadPDF}>
          Загрузить в PDF
        </Button>
      </ButtonContainer>
    </>
  );
}
