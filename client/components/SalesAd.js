import React, { Component } from 'react';
import { connect } from 'react-redux';
class SalesAd extends Component {
  state = {
    currIndex: 0
  };

  nextPage = () => {
    const { ads } = this.props;
    const { currIndex } = this.state;
    const newIndex = currIndex < ads.length - 1 ? currIndex + 1 : 0;
    this.setState({ currIndex: newIndex });
  };

  prevPage = () => {
    const { ads } = this.props;
    const { currIndex } = this.state;
    const newIndex = currIndex === 0 ? ads.length - 1 : currIndex - 1;
    this.setState({ currIndex: newIndex });
  };

  render() {
    const { ads } = this.props;
    console.log(this.state);
    const { currIndex } = this.state;
    return (
      <div id="ads" className="flex column align-center">
        <div style={{position: 'fixed'}} onClick={this.prevPage} className="carosuel-right-button">
          <span />
          <span />
        </div>
        <img className="ad__image" src={ads[currIndex].image} />
        <div style={{position: 'fixed'}}  onClick={this.nextPage} className="carosuel-left-button">
          <span />
          <span />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ads: state.firebase.ads
});

export default connect(
  mapStateToProps,
  null
)(SalesAd);
