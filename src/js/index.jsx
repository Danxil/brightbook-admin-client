import React from 'react';
import AppContainer from './components/AppContainer.jsx';
import CategoriesContainer from './components/CategoriesContainer.jsx';
import AddCategory from './components/AddCategory.jsx';
import EditCategory from './components/EditCategory.jsx';
import {run, HashLocation, Route, Link } from 'react-router';

let routes = (
    <Route handler={AppContainer}>
        <Route name="categories" path="/categories" handler={CategoriesContainer} />
        <Route name="edit-category" path="/categories/:id" handler={EditCategory} />
        <Route name="add-category" path="/add-category" handler={AddCategory} />
    </Route>
)

run(routes, HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('main'));
});