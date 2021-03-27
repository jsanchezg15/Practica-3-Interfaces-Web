import React, {useState} from 'react';
import './App.css';
import BotonesComponent from './components/Botones';
import InformacionComponent from './components/Informacion';

function App() {

	const [info, setInfo] = useState<string[]>(["STAR WARS"])

	const updateInfo = (value: string[]) => {
		setInfo(value)
	}

  	return (
    	<div className="App">			
			<BotonesComponent updateInfo={updateInfo} info={info}/>
			<InformacionComponent data={info}/>
    	</div>
  	);
}

export default App;
