import { Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import 'antd/dist/antd.css';

import { Content, Header, Option, Section, Wrapper } from './components';
import { Info, storage, Types } from 'utils';
const types = Object.values(Types);

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Retrieve the currently set values in storage
    storage.get(types, data => {
      const updatedState = {};
      types.forEach(type => {
        updatedState[type] = typeof data[type] === 'boolean' ? data[type] : false;
      });

      // We wait on mount here for synchronous storage retrieval methods (i.e. local storage)
      setTimeout(() => {
        this.setState(updatedState);
      });
    });
  }

  // Update a site's active status
  setOption(type) {
    const stateUpdate = { [type]: !this.state[type] };
    storage.set(stateUpdate, () => {
      this.setState(stateUpdate);
    });
  }

  render() {
    return (
      <Wrapper>
        <Section>
          <Header>Enable/disable available candidate sourcing sites</Header>
          <Content>
            {types.map(type => {
              const info = Info[type];
              return (
                <Option key={type}>
                  <Switch checked={this.state[type]} onChange={() => this.setOption(type)} />
                  <img src={info.favicon} />
                  <label>{info.label}</label>
                </Option>
              );
            })}
          </Content>
        </Section>
      </Wrapper>
    );
  }
}

const Root = process.env.NODE_ENV === 'development' ? hot(module)(Options) : Options;
ReactDOM.render(<Root />, document.getElementById('root'));
