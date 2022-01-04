import React from "react";
import PropTypes from 'prop-types';

const Filter = (props) => {
  return (
    <input type="text" name="filter" placeholder="Search" onChange={(e) => props.handler(e)}/>
  );
};

Filter.propTypes = {
  handler: PropTypes.func.isRequired
}

export default Filter;