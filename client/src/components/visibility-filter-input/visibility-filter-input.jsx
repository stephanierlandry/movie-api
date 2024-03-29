import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    className="search"
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="search"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);
