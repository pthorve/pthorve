import React, { Component } from 'react';

class CustomizedCarousal extends Component {
  state = {
    items: [
      {
        id: 1,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 2,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 3,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 4,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 5,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 6,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 7,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 8,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 9,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 10,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 11,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 12,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 13,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 14,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 15,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 16,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      },
      {
        id: 17,
        caption: 'This is my Card',
        imgsrc:
          'https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/1165112367.jpg',
        imagealttext: 'demo image'
      }
    ]
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        <div
          className="sliderContainerDiv"
          style={{
            width: '100%',
            overflow: 'scroll',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap'
          }}
        >
          {items.map(item => (
            <div
              className="carousalItem"
              key={item.id}
              style={{
                height: '252px',
                alignItems: 'center',
                margin: '10px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="imgcapttion">{item.caption}</div>
              <img
                loading="auto"
                className="img-responsive"
                src={item.imgsrc}
                alt={item.imagealttext}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomizedCarousal;
