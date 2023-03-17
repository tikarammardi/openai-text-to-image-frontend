import './App.css';

import { useState } from 'react';

function App() {

  const [imageUrl, setImageUrl] = useState("https://oaidalleapiprodscus.blob.core.windows.net/private/org-2gUYg1DGUYdDpxImMRqMxh8e/user-Qt30HzkeIHDM08Z4xjfj84Qo/img-zeHQjmANlZ4WLJUE0Wl1CvMD.png?st=2023-03-11T15%3A11%3A06Z&se=2023-03-11T17%3A11%3A06Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-10T20%3A43%3A14Z&ske=2023-03-11T20%3A43%3A14Z&sks=b&skv=2021-08-06&sig=XHYvZIGYOYiZsSzFIjCJ9lgxPplcCG6rRoLs14mdtho%3D")
  const [imageDescription, setImageDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleOnSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    try {
      if (!imageDescription) return;

      const response = await fetch('http://localhost:5000/api/generate', {
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
