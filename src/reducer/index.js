import { graphDataCreator } from '../Data/graphDataCreator';

const ActionType = {
  SET_GRAPH_DATA: `SET_GRAPH_DATA`,
};

const ActionCreator = {
  setGraphData: (transformedFormData, ...args) => {
    console.log('СМОТРИМ arg', args);
    const newState = {
      graphData: graphDataCreator(transformedFormData),
      transformedFormData: [...transformedFormData],
      otherFormData: args,
    };
    return {
      type: ActionType.SET_GRAPH_DATA,
      payload: newState,
    };
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.SET_GRAPH_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};

export { ActionType, ActionCreator, reducer };
