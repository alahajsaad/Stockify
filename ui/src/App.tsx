// App.tsx
import React from 'react';
import Layout from './Layout';
import RepairDetailsPage from './RepairDetailsPage';

const App: React.FC = () => {
  return (
    <Layout title="Tableau de bord">
      {/* Exemple de contenu de page */}
     <RepairDetailsPage/>
    </Layout>
  );
}

export default App;