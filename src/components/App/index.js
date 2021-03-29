import React, { useReducer, useState } from 'react';
import { reducer } from '../../reducer';
import { Context } from '../../services/сontextCreater';
import styled, { createGlobalStyle } from 'styled-components';
import '../../stylus';

import { Graph } from '../Graph';
import { MainForm } from '../MainForm';
import { MainTable } from '../MainTable';
import { formData } from '../../Data/initialGraphData';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Roboto";
    font-weight: normal;
    src: local("Roboto"), url('https://fonts.google.com/...') format("truetype");
  }
  
  .ant-btn-primary {
    background-color: darkgrey;
    border: 1px solid white;
    
    &:hover {
      background-color: #c5c5c5;
      border: 1px solid #393939;
      color: #393939;
    }
    
    &:focus {
      background-color: #6e6e6e;
      border: 1px solid white;
    }
  }
  
  .ant-switch {
    &:active {
      border-color: #ff0000;
    }
  }
  
  .ant-switch-checked {
    background-color: #393939;
  }
  
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: auto;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid gray;
  background-color: whitesmoke;
`;

const WrapperRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 900px;
  height: 555px;
`;

// const init = (formData) => formData;

function App() {
  const [state, dispatch] = useReducer(reducer, formData);
  const [renderFlag, setRenderFlag] = useState(false);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <GlobalStyle />
      <Wrapper>
        <MainForm setRenderFlag={setRenderFlag} renderFlag={renderFlag} />
        <WrapperRight>
          {!renderFlag && <Graph />}
          {renderFlag && <MainTable state={state} />}
        </WrapperRight>
      </Wrapper>
    </Context.Provider>
  );
}

export default App;
