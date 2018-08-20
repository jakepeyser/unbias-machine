import { Switch } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Header, Settings, Wrapper } from './components';
import { helpers, Info, storage, Types } from 'utils';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      loading: true
    };

    helpers.getCurrentType(type => {
      this.type = type;
      storage.get(type, data => {
        // We wait on mount here for synchronous storage retrieval methods (i.e. local storage)
        setTimeout(() => {
          this.setState({ active: data[type] });
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
    return (
      <Wrapper>
        <Header>
          <h1>Unbias Machine</h1>
        </Header>
        <Settings>
          <div>
            <Switch checked={this.state.active} onChange={this.toggleStatus} />
            <label>Active</label>
          </div>
        </Settings>
      </Wrapper>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'));
