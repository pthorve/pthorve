/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import videojs from 'video.js';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  refHandler = node => {
    this.videoNode = node;
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player className="vjs-theme-forest">
        <video ref={this.refHandler} className="video-js vjs-theme-forest" />
      </div>
    );
  }
}
