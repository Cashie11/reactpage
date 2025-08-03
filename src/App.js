import React from 'react';
import './App.css';
import Header from './components/Header';
import FormSection from './components/FormSection';
import DataTable from './components/DataTable';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <section className="container">
          <h2>Welcome to the Software Testing Demo</h2>
          <p className="intro-text">
            This application is designed to help students practice software testing techniques.
            Below you'll find several interactive components that can be used for testing practice.
          </p>
        </section>

        <FormSection />
        <DataTable />
        <Counter />
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Software Testing Demo - Educational Purposes</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
