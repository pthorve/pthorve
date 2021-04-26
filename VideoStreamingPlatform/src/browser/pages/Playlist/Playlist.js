import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlexView from 'react-flexview';

import { fetchListData } from '../../modules/content/content.actions';
import { Margin } from '../../components/Layout';

import './Playlist.css';

class Playlist extends Component {
  static async getInitialProps({ match, store }) {
    await store.dispatch(fetchListData(match.params.id));
  }

  componentDidMount() {
    const {
      data,
      loading,
      match: { params }
    } = this.props;

    if (data === null && loading === false) {
      this.props.fetchListData(params.id);
    }
  }

  loadData(props) {
    const {
      match: { params }
    } = props;
    const { data } = this.props;

    if (data === null || data.id !== params.id) {
      this.props.fetchListData(params.id);
    }
  }

  render() {
    const { data, loading, match } = this.props;
    if (loading === true || data === null) {
      return <div>Loading...</div>;
    }
    this.loadData(this.props);

    return (
      <FlexView column>
        <Margin size={10}>
          <FlexView hAlignContent="center">
            <h2 style={{ fontSize: '48px' }}>{match.params.slug}</h2>
          </FlexView>
        </Margin>
        <FlexView wrap hAlignContent="center">
          {data.item.map(item => (
            <Margin size={5} key={item.id}>
              <Link to={`/video-${item.slug}-${item.id}`}>
                <img
                  src={
                    item.poster ||
                    `https://vuclipi-a.akamaihd.net/p/tthumb168x252/d-1/${
                      item.id
                    }.jpg`
                  }
                  alt={item.title}
                />
              </Link>
            </Margin>
          ))}
        </FlexView>
      </FlexView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.content.playlistLoading,
    data: state.content.playlistData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchListData
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
