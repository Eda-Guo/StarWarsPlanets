import React from 'react';
import MainHeader from './components/MainHeader';
import Main from './components/Main';
import MainFooter from './components/MainFooter';

class App extends React.Component {
  render() {
    return (
      <div className="mainContent">
        <MainHeader />
        <Main />
        <MainFooter />
      </div>
    );
  }
}

export default App;
