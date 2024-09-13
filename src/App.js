import './App.css';
import React, { useState } from 'react';
import CanvasComponent from './CanvasComponent3'; //? вариант, разрабатываемый

const App = () => {
  const [hero1Color, setHero1Color] = useState('blue');
  const [hero2Color, setHero2Color] = useState('red');

  // const handleHero1ColorChange = (color) => {
  //   setHero1Color(color);
  // };

  // const handleHero2ColorChange = (color) => {
  //   setHero2Color(color);
  // };

  return (
    <div className="App">
      <CanvasComponent hero1Color={hero1Color} hero2Color={hero2Color} />
    </div>
  );
};

export default App;
