import React, { Component } from 'react';
import ImageComponent from './components/ImageComponent';
import ImageCaption from './components/ImageCaption';

class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      posters: [],
      page: 1,
      imgsrc: '',
      pageTitle: ''
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchData(this.state.page);
  }

  infiniteScroll = () => {
    // End of the document reached?
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });

      this.fetchData(newPage);
    }
  }

  fetchData = (pageNum) => {
    let apiUrl = './API/CONTENTLISTINGPAGE-PAGE' + pageNum + '.json';
    if (pageNum <= 3) {
      fetch(apiUrl)
        .then(data => data.json())
        .then(data => {
          let resArr = data.page["content-items"].content;
          this.setState({
            posters: [...this.state.posters, ...resArr],
            pageTitle: data.page.title
          })
        })
    }

  }

  getSource = (item) => {
    try {
      require('../public/Slices/' + item['poster-image']);
      this.setState({ imgsrc: '/Slices/' + item['poster-image'] });

    }
    catch (err) {
      this.setState({ imgsrc: '/Slices/placeholder_for_missing_posters.png' });
    }

  }

  render() {
    return (
      <div className="App"
        style={{
          background: '#000'
        }}>
        <div style={{
          display: 'flex', padding: '10px', alignItems: 'center', fontSize: '22px', fontWeight: '600', color: '#fff'
        }}>
          <span style={{
            height: '20px',
            width: '30px',
            backgroundSize: 'contain',
            display: 'flex', backgroundImage: 'url(Slices/Back.png)', backgroundRepeat: 'no-repeat'
          }}></span>
          {this.state.pageTitle}
        </div>
        <div
          className="sliderContainerDiv"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: '50px',
            justifyContent: 'flex-start',
            marginLeft: '2.5%'
          }}
        >
          {
            this.state.posters && this.state.posters.length > 0 && this.state.posters.map((item, key) =>

              <div
                className="carousalItem items-center margin"
                key={key}
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '0 0 calc(33% - 2.5%)',
                  justifyContent: 'flex-start',
                  marginBottom: '50px',
                  marginRight: '2.5%',
                  width: 'calc(32% - 2.5%)'
                }}
              >

                <ImageComponent url={item['poster-image']} />
                <ImageCaption name={item.name} />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
