import React, { Component } from 'react';

class ImageCaption extends Component {

  render() {
    return (
      <div>
        <div className="image-caption" style={{
          color: '#fff',
          fontSize: '18px',
          marginTop: '12px'
        }}>
          {this.props.name}
        </div>

      </div>
    );
  }
}

export default ImageCaption;
