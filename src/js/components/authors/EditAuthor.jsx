import React from 'react';
import AuthorsActionCreators from '../../actions/AuthorsActionCreators.js';
import AuthorsStore from '../../stores/AuthorsStore.js';
import Constants from '../../Constants.js';
import {Button, Input, Modal, ButtonToolbar} from 'react-bootstrap';
import {Navigation, Link} from 'react-router';
import FieldsGenerator from '../../tools/FieldsGenerator.js';

export default React.createClass({
  mixins: [Navigation],

  getInitialState() {
    var obj = {}

    let authorId = this.props.params.id

    AuthorsActionCreators.loadAuthors(authorId)

    obj.showDeleteModal = false

    return obj
  },

  _onChange() {
    this.setState(function(prev) {
      var author = AuthorsStore.getOne(this.props.params.id)

      prev.form = author

      return prev
    })
  },

  componentDidMount() {
    AuthorsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AuthorsStore.removeChangeListener(this._onChange);
  },

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  },

  submit() {
    var data = this.state.form

    var fileForms = {
      photo: this.refs.authorPhoto.getDOMNode(),
    }

    AuthorsActionCreators.editAuthor(this.props.params.id, data, fileForms).then(function() {
      this.transitionTo('authors')
    }.bind(this))
  },

  delete() {
    this.toggleDeleteModal()

    AuthorsActionCreators.deleteAuthor(this.props.params.id).then(function() {
      this.transitionTo('authors')
    }.bind(this))
  },

  render() {
    let {form} = this.state

    if (!form)
      return(<div></div>)

    var fields = [
      {
        type: 'text',
        label: 'Enter author',
        name: 'name',
      },
      {
        type: 'textarea',
        label: 'About author',
        name: 'about',
      },
      {
        type: 'uploadImage',
        name: 'authorPhoto',
        fieldName: 'photos',
        help: 'Chose author photo',
        label: 'Author photo',
        images: form.photos,
      },
    ]

    return (
      <div>
        <div className="form-group clearfix">
          <h2>
            Edit author
          </h2>
        </div>
        {FieldsGenerator.call(this, this.state, fields)}
        <hr/>
        <ButtonToolbar className="pull-left">
          <Button bsStyle='primary' onClick={this.submit}>Edit author</Button>
        </ButtonToolbar>
        <Button bsStyle='danger' className="pull-right" onClick={this.toggleDeleteModal}>Delete author</Button>



        <Modal show={this.state.showDeleteModal} onHide={this.toggleDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to delete this author?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{form.name}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.delete}>Delete</Button>
            <Button bsStyle="primary" onClick={this.toggleDeleteModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
