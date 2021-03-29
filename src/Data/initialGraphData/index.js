export const formData = {
  graphData: {
    nodes: [
      {
        id: '7',
        x: 100,
        y: 0,
        size: 50,
        type: 'rect',
        anchorPoints: [
          [1, 0.5],
          [0, 0.5],
        ],
      },
      {
        id: '8',
        x: 250,
        y: 0,
        size: 40,
        anchorPoints: [
          [1, 0.5],
          [0, 0.5],
        ],
      },
      {
        id: '9',
        x: 400,
        y: 0,
        size: 40,
        anchorPoints: [[0, 0.5]],
      },
    ],
    edges: [
      {
        source: '7',
        target: '8',
        sourceAnchor: 0,
        targetAnchor: 1,
      },
      {
        source: '8',
        target: '9',
        sourceAnchor: 0,
        targetAnchor: 1,
      },
    ],
  },
};

export const formData2 = {
  nodes: [],
  edges: [],
};
