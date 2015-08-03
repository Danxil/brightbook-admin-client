import React from 'react';
import Author from './Author.jsx';
import ListGroup from '../../../../node_modules/react-bootstrap/lib/ListGroup';
import AuthorsActionCreators from '../../actions/AuthorsActionCreators.js';
import AuthorsStore from '../../stores/AuthorsStore.js';

export default React.createClass({
  getInitialState() {
    AuthorsActionCreators.loadAuthors()

    return {}
  },

  createAuthorsDom(authors) {
    return authors.map(author => <Author author={author} />)
  },

  _onChange() {
    this.setState({authors: AuthorsStore.getAll()});
  },

  componentDidMount() {
    AuthorsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AuthorsStore.removeChangeListener(this._onChange);
  },

  render() {
    let {authors} = this.state;

    if (!authors)
      return <div></div>

    return (
      <ListGroup>
        {this.createAuthorsDom(authors)}
      </ListGroup>
    );
  }
});
