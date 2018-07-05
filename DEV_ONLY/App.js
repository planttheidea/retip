// external dependencies
import React from 'react';
import {createComponent} from 'react-parm';
import styled from 'styled-components';

// src
import Retip from '../src';

const Container = styled.div`
  padding: 15px;
`;

const Thing = styled.div`
  margin-right: 15px;
`;

const App = createComponent(() => (
  <Container>
    <h1>Tooltips!</h1>

    <h3>Basic examples</h3>

    <Retip message="I am a basic tooltip">
      <Thing>Top aligned</Thing>
    </Retip>

    <Retip
      alignment="bottom"
      message="I am a basic tooltip"
    >
      <Thing>Bottom aligned</Thing>
    </Retip>

    <Retip
      alignment="right"
      message="I am a basic tooltip"
      offset={{left: -15}}
    >
      <Thing>Right aligned</Thing>
    </Retip>

    <Retip
      alignment="left"
      message="I am a basic tooltip"
    >
      <Thing>Left aligned</Thing>
    </Retip>

    <h3>Complex examples</h3>

    <Retip
      hideDelay={1000}
      maxHeight={100}
      message={
        <div>
          I am a tooltip <a href="foo.com">with a link</a> because I am a react component!
          <br />
          <br />
          <br />
          <br />
          <br />
          I am also really tall.
        </div>
      }
    >
      <Thing>Top with custom max height with a delay hiding the tooltip</Thing>
    </Retip>

    <Retip
      alignment="bottom"
      backgroundColor="purple"
      maxWidth={1000}
      message={
        <div>
          I am a tooltip <a href="foo.com">with a link</a> because I am a react component!
          <br />
          <br />
          <br />
          <br />
          <br />
          I am also really tall.
        </div>
      }
    >
      <Thing>Bottom with custom max width and background color</Thing>
    </Retip>
  </Container>
));

export default App;
