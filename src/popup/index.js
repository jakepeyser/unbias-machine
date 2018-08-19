import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff'
    };

    // Get current color from chrome storage
    chrome.storage.sync.get('color', data => {
      this.setState({ color: data.color });
    });
  }

  changeColor = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `document.body.style.backgroundColor = "${this.state.color}";`
      });
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={this.changeColor}
          style={{
            backgroundColor: this.state.color,
            height: '30px',
            outline: 'none',
            width: '30px'
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'));
