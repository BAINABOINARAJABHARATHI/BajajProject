import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://your-app-name.herokuapp.com/bfhl', {
                data: JSON.parse(inputData)
            });
            setResponseData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSelect = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedOptions(selected);
    };

    return (
        <div className="App">
            <h1>{roll_number}</h1>
            <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='Enter JSON data'
            />
            <button onClick={handleSubmit}>Submit</button>
            {responseData && (
                <>
                    <select multiple onChange={handleSelect}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
                        {selectedOptions.includes('numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
                        {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
