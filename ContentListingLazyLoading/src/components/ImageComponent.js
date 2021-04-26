import React, { Component } from 'react';

class ImageComponent extends Component {

    render() {
        return (
            <div>
                <img src={'/Slices/' + this.props.url} alt={this.props.url} style={{
                    objectFit: 'cover',
                    width: '110px'
                  }}/>

            </div>
        );
    }
}

export default ImageComponent;
