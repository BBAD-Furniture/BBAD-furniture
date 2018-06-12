import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterProductByColor, filterProductByCategory } from '../store';
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import '../styles/sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.categoryToggle = this.categoryToggle.bind(this);
    this.colorToggle = this.colorToggle.bind(this);

    this.state = {
      categoryDropdownOpen: false,
      colorDropdownOpen: false
    };
  }

  categoryToggle() {
    this.setState(prevState => ({
      categoryDropdownOpen: !prevState.categoryDropdownOpen
    }));
  }

  colorToggle() {
    this.setState(prevState => ({
      colorDropdownOpen: !prevState.colorDropdownOpen
    }));
  }
  render() {
    let products = this.props.products || [];
    let categories = Array.from(
      new Set(products.map(product => product.category))
    );
    let colors = Array.from(new Set(products.map(product => product.color)));

    function handleCategory(event) {
      let category = event.target.textContent;
      this.props.filterCategory(category);
    }
    function handleColor(event) {
      let color = event.target.textContent;
      this.props.filterColor(color);
    }

    function resetFilter() {
      this.props.filterColor('');
    }
    return (
      <div className="sidebar-container">
        <div className=" filter-section">
          <h2 className="sidebar-title"> Filter By</h2>
          <Button
            className="sidebar-reset"
            onClick={resetFilter.bind(this)}
            outline
            color="success">
            Clear Filters
          </Button>
        </div>
        <div className="filter-section">
          <h3>Categories</h3>

          <Dropdown
            color="success"
            isOpen={this.state.categoryDropdownOpen}
            toggle={this.categoryToggle}>
            <DropdownToggle caret>Categories</DropdownToggle>
            <DropdownMenu>
              {categories.map(category => (
                <DropdownItem
                  key={category}
                  onClick={handleCategory.bind(this)}
                  className="filter-item">
                  {category}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="filter-section">
          <h3>Colors</h3>
          <Dropdown
            isOpen={this.state.colorDropdownOpen}
            toggle={this.colorToggle}>
            <DropdownToggle caret>Colors</DropdownToggle>
            <DropdownMenu>
              {colors.map(color => (
                <DropdownItem
                  key={color}
                  onClick={handleColor.bind(this)}
                  className="filter-item">
                  {color}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    products: state.products,
    filter: state.filter
  };
};
const mapDispatch = dispatch => {
  return {
    filterColor: filter => dispatch(filterProductByColor(filter)),
    filterCategory: filter => dispatch(filterProductByCategory(filter))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Sidebar);
