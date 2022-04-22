import React, {useState} from 'react';


export function ActForm(props) {

    const arrDuration = [];

    for (let i = 1; i <= 24; i++) {
        arrDuration.push(i);
    }

    const inputInicial = {
    title:'',
    difficulty:'',
    duration: '',
    season: ''
    }
    
    const [input, setInput] = useState(inputInicial);

    const handleOnChange = (e) => {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        props.addTodo(input);
        setInput(inputInicial)
    }

    return (
        <div className="container-80">
        <form onSubmit={handleOnSubmit}>
            <div>
            <input className='search' name="title" placeholder="Activity name to create" value={input.title} onChange={handleOnChange}></input>
            </div>
                <div className='container-double'>
                    <div className='select'>
                        <select  className='select-box' onChange={handleOnChange} >
                            <option value=''>Difficulty Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className='select'>
                        <select  className='select-box' onChange={handleOnChange} >
                            <option value=''>Duration Select</option>
                            {arrDuration.map(duration => (
                                    <option key={duration.id} value={duration}>{`${duration}:00 Hours`}</option>
                                ))}
                        </select>
                    </div>
                    <div className='select'>
                        <select  className='select-box' onChange={handleOnChange} >
                            <option value=''>Season Select</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>
                </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop:'50px'}}>   
            <button className='light-button' type="submit" >Add</button>
            </div>
        </form>
        </div>
    )
};
