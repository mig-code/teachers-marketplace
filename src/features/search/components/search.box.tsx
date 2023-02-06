import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../core/store/store';
import * as ac from '../../../core/reducer/action.creator';

export function SearchBox() {
    const navigate = useNavigate();

    const { search } = useSelector((state: RootState) => state);
    const dispatcher = useDispatch();

    const initialSearchForm = search.searchQuery;
    const [searchForm, setSearchForm] = useState(initialSearchForm);

    const handleInput = (ev: SyntheticEvent) => {
        const searchInput = ev.target as HTMLFormElement;
        setSearchForm(searchInput.value);

        search.realTimeSearch &&
            dispatcher(ac.setQueryActionCreatorSearch(searchInput.value));

        console.log(searchForm);
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        console.log(searchForm);
        navigate('/buscar');
        //Found path '/buscar' but there was no route config
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
                {!search.realTimeSearch && (
                    <button type="submit">Buscar</button>
                )}
            </form>
        </>
    );
}
