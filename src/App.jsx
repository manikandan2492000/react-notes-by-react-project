import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import TopicList from './components/features/TopicList/TopicList';
import TopicDetail from './components/features/TopicDetail/TopicDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TopicList />} />
        <Route path="topic/:topicId" element={<TopicDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
