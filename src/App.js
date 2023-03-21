import './App.css';

import { useState } from 'react';

function App() {

  const [imageUrl, setImageUrl] = useState("https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg")
  const [imageDescription, setImageDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleOnSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    try {
      if (!imageDescription) return;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: imageDescription
        })
      })

      const data = await response.json();
      setImageUrl(data.imageUrl);

      setLoading(false)

    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={imageUrl} className="App-logo" alt="logo" />
        {error && <p>{error}</p>}
        <p>
          Please enter a description for the image
        </p>
        <div className='form'>
          <form>
            <input value={imageDescription} onChange={event => setImageDescription(event.target.value)} />
            <button type='submit' onClick={handleOnSubmit}>{loading ? "Loading ..." : "Generate Image"}</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
