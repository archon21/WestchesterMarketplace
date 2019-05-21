import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Home, Info, SalesAd} from './components';
import {Templator } from './auth-components'
import { NotFound, Loader } from './sub-components';
import Privacy from './components/Footer/Privacy'
class Routes extends Component {
  state = { mounted: false };
  componentDidMount() {
    this.setState({ mounted: true });

  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }
  render() {
    const { mounted } = this.state;
    return mounted ? (
      <Switch>
        <Route exact path="/" component={SalesAd} />
        <Route exact path="/sales-ad" component={SalesAd} />
        <Route exact path="/about" component={Home} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/templator" component={Templator} />
        <Route component={NotFound} />
      </Switch>
    ) : (
      <Loader />
    );
  }
}

export default Routes;
