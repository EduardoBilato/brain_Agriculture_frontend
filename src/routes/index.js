import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditProducer from '../pages/EditProducer';
import CreateProducer from '../pages/CreateProducer';
import ListProducers from '../pages/ListProducers';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<ListProducers />} />
        <Route path="/edit/:id" exact element={<EditProducer />} />
        <Route path="/create" exact element={<CreateProducer />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;


