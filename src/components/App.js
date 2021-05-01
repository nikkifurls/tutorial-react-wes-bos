import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from './Fish';
import base from '../base';

// Order: state, lifecycle events, custom stuff, render
class App extends React.Component {
  // State

  // State property
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
    // match: this.propTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;

    // 1. Reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // In Firebase, refs are references to data
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // State functions - must live inside same component that state lives in

  // Update state
  addFish = fish => {
    // 1. Copy existing state, never want to directly modify state (mutation)
    const fishes = { ...this.state.fishes };

    // 2. Add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // 3. Set the new fishes object to state
    // this.setState({ fishes: fishes });
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Copy current state
    const fishes = { ...this.state.fishes };

    // 2. Update state
    fishes[key] = updatedFish;

    // 3. Set that to state
    this.setState({ fishes });
  }

  deleteFish = key => {
    // 1. Copy current state
    const fishes = { ...this.state.fishes };

    // 2. Update state
    fishes[key] = null;

    // 3. Set that to state
    this.setState({ fishes });
  }

  // Load sample data
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder = key => {
    // 1. Copy existing state
    const order = { ...this.state.order };

    // 2. Either add to order or update number in order
    order[key] = order[key] + 1 || 1;

    // 3. Update state object
    this.setState({ order });
  }

  removeFromOrder = key => {
    // 1. Copy existing state
    const order = { ...this.state.order };

    // 2. Remove from order
    delete order[key];

    // 3. Update state object
    this.setState({ order });
  }

  render() {  
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key =>
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            )}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;