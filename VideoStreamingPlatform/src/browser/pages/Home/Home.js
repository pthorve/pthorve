import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlexView from 'react-flexview';

import { Margin } from '../../components/Layout';
import CustomizedCarousal from '../../components/CustomizedCarousal';
import { fetchHomeData } from '../../modules/content/content.actions';
import './Home.css';

class Home extends Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchHomeData());
  }

  componentDidMount() {
    const { data, loading } = this.props;
    if (data === null && loading === false) {
      this.props.fetchHomeData();
    }
  }

  componentDidUpdate() {
    const { data, loading } = this.props;
    if (data === null && loading === false) {
      this.props.fetchHomeData();
    }
  }

  render() {
    const { data, loading } = this.props;
    if (loading === true || data === null) {
      return <div>Loading...</div>;
    }
    return (
      <>
        <CustomizedCarousal />
        {data.map(list => {
          return (
            <FlexView column key={list.id}>
              <Margin size={10}>
                <h2>{list.title}</h2>
              </Margin>
              <FlexView style={{ width: '100%', overflow: 'auto' }}>
                {list.item.map(item => (
                  <Margin size={5} key={item.id}>
                    <Link
                      to={`/${
                        item.type === 'playlist' ? 'playlist' : 'video'
                      }-${item.slug}-${item.id}`}
                    >
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
        })}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.content.homeLoading,
    data: state.content.homeData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchHomeData
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
