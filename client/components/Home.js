import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Block,
  WindoW,
  GalleryBlock,
  Flex,
  Divider,
  Animator
} from '../sub-components/containers';
import { Video, Fab, List, Table, Carousel } from '../sub-components';

class Home extends Component {
  state = {
    scrolled: 0
  };

  charity1 = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    this.setState({ scrolled: window.pageYOffset });
  };

  render() {
    const { charity1, state, props, aboutBlock } = this;
    // const { charities, sporting } = props;
    const { scrolled } = state;
    console.log(aboutBlock);
    return (
      <div style={{ overflowX: 'hidden' }} className="flex column align-center">
        <Divider
          border
          backgroundColor="background-primary"
          color="color-secondary"
        >
          <h1 className="headline-4">Community</h1>
        </Divider>
        <WindoW
          column
          backgroundUrl="https://firebasestorage.googleapis.com/v0/b/hayesdevelopers.appspot.com/o/storrs-rd-plaza%2FDSC_1935%20copy.JPG?alt=media&token=19cc7e5e-cc51-4cfd-8fc0-92dbbaee06ab"
        >
          <Flex row>
            <Animator
              inRef={charity1}
              scrolled={scrolled}
              animation="a-wrapper--left"
              maxHeight="maxh-500px"
              maxWidth="maxw-450px"
            >
              <Block column type="info-card" full>
                <h4 className="headline-4 color-secondary p-20px">
                  The Market
                </h4>
                <p className="body-1 color-secondary p-20px">
                  Westchester Marketplace is a small, family owned grocery store
                  located in Colchester, Connecticut. We provide quality meats,
                  large grinders, and a multitude of products at an affordable
                  price. We value our customers business and will always do our
                  best to accomodate your needs.
                </p>
              </Block>
            </Animator>
          </Flex>
        </WindoW>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Home);
