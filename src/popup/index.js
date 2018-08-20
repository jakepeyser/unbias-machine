import { Switch } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Border, Container, Header, Settings, Site, Wrapper } from './components';
import Logo from 'assets/logo.svg';
import { helpers, Info, storage } from 'utils';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      loading: true
    };

    helpers.getCurrentType(type => {
      storage.get(type, data => {
        // We wait on mount here for synchronous storage retrieval methods (i.e. local storage)
        setTimeout(() => {
          this.setState({ active: data[type], type });
        });
      });
    });
  }

  toggleStatus = () => {
    storage.set({ [this.type]: !this.state.active }, () => {
      this.setState({ active: !this.state.active });
    });
  };

  render() {
    const info = Info[this.state.type];
    return (
      <Wrapper>
        <Header>
          <Logo height={28} width={28} />
          <h1>Unbias Machine</h1>
        </Header>
        <Container>
          {this.state.type && (
            <Site>
              <img src={info.favicon} />
              <h2>{info.label}</h2>
            </Site>
          )}
          <Border>
            <Settings>
              <div>
                <Switch checked={this.state.active} onChange={this.toggleStatus} />
                <label>Active</label>
              </div>
            </Settings>
          </Border>
        </Container>
      </Wrapper>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'));
