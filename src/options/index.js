import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

const colors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

class Options extends Component {
  setColor(color) {
    chrome.storage.sync.set({ color }, function() {
      console.log(`color is ${color}`);
    });
  }

  render() {
    console.log(colors);
    return (
      <Fragment>
        <div>
          {colors.map(color => {
            return (
              <button
                key={color}
                onClick={() => this.setColor(color)}
                style={{
                  backgroundColor: color,
                  height: '30px',
                  margin: '10px',
                  outline: 'none',
                  width: '30px'
                }}
              />
            );
          })}
        </div>
        <p>Choose a different background color!</p>
      </Fragment>
    );
  }
}

ReactDOM.render(<Options />, document.getElementById('root'));
