import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import CategoriesContainer from './components/categories/CategoriesContainer.jsx';
import AddCategory from './components/categories/AddCategory.jsx';
import EditCategory from './components/categories/EditCategory.jsx';
import BooksContainer from './components/books/BooksContainer.jsx';
import AddBook from './components/books/AddBook.jsx';
import EditBook from './components/books/EditBook.jsx';
import BookReviews from './components/books/BookReviews.jsx';
import BookReasons from './components/books/BookReasons.jsx';
import CoverTypesContainer from './components/cover-types/CoverTypesContainer.jsx';
import {run, HashLocation, Route, Link } from 'react-router';

let routes = (
    <Route handler={AppContainer}>
        <Route name="categories" path="/categories" handler={CategoriesContainer} />
        <Route name="add-category" path="/add-category" handler={AddCategory} />
        <Route name="edit-category" path="/categories/:id" handler={EditCategory} />
        <Route name="books" path="/books" handler={BooksContainer} />
        <Route name="add-book" path="/add-book" handler={AddBook} />
        <Route name="edit-book" path="/books/:id" handler={EditBook} />
        <Route name="edit-book-reviews" path="/books/:id/reviews" handler={BookReviews} />
        <Route name="edit-book-reasons" path="/books/:id/reasons" handler={BookReasons} />
        <Route name="cover-types" path="/cover-types" handler={CoverTypesContainer} />
        <Route name="edit-cover-type" path="/edit-cover-type" handler={CoverTypesContainer} />
        <Route name="add-cover-type" path="/add-cover-type" handler={CoverTypesContainer} />
    </Route>
)

run(routes, HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('main'));
});