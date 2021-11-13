import './App.css';

const { REACT_APP_API_URL } = process.env;

function App() {
  const handleStart = async () => {
    try {
      const url = REACT_APP_API_URL + '/room/new'
      console.log(process.env)
      const startResponse = await fetch(url, {
        method: 'POST',
      })
      const startJson = await startResponse.json()
      console.log(startJson)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h1>Drawgestions</h1>
      <button onClick={ handleStart }>Start New Game</button>
      <button>Join Game</button>
    </div>
  );
}

export default App;
