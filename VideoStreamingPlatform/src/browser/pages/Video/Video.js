import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlexView from 'react-flexview/lib';

import { Margin } from '../../components/Layout';
import { fetchVideoData } from '../../modules/content/content.actions';
import VideoPlayer from '../../components/VideoPlayer';

import './Video.css';

class Video extends Component {
  static async getInitialProps({ match, store }) {
    await store.dispatch(fetchVideoData(match.params.id));
  }

  componentDidMount() {
    const {
      data,
      loading,
      match: { params }
    } = this.props;

    if (data === null && loading === false) {
      this.props.fetchVideoData(params.id);
    }
  }

  loadData(props) {
    const {
      match: { params }
    } = props;
    const { data } = this.props;

    if (data === null || data.id !== params.id) {
      this.props.fetchVideoData(params.id);
    }
  }

  render() {
    const { data, loading, match } = this.props;
    if (loading === true || data === null) {
      return <div>Loading...</div>;
    }
    this.loadData(this.props);

    const videoJsOptions = {
      autoplay: false,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      width: 720,
      height: 300,
      controls: true,
      sources: [
        {
          src: data.href,
          type: 'video/mp4'
        }
      ]
    };

    return (
      <FlexView column>
        <Margin size={10}>
          <FlexView hAlignContent="center">
            <VideoPlayer {...videoJsOptions} />
          </FlexView>
        </Margin>
        <Margin size={10}>
          <FlexView hAlignContent="center">
            <h2 style={{ fontSize: '48px' }}>{match.params.slug}</h2>
          </FlexView>
        </Margin>
        <Margin size={10}>
          <FlexView hAlignContent="center">
            <h2 style={{ fontSize: '24px' }}>{data.description}</h2>
          </FlexView>
        </Margin>
      </FlexView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.content.videoLoading,
    data: state.content.videoData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchVideoData
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
