import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBox() {
    const initialSearchForm = '';
    const [searchForm, setSearchForm] = useState(initialSearchForm);
    const navigate = useNavigate();

    const handleInput = (ev: SyntheticEvent) => {
        const searchInput = ev.target as HTMLFormElement;
        setSearchForm(searchInput.value);
        console.log(searchForm);
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        console.log(searchForm);
        navigate('/buscar');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search"></label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchForm}
                    onInput={handleInput}
                    placeholder="Buscar"
                />
                <button type="submit">Buscar</button>
            </form>
        </>
    );
}
