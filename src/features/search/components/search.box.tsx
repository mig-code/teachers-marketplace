import { SyntheticEvent, useEffect, useState } from 'react';
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
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        dispatcher(ac.setQueryActionCreatorSearch(searchForm));
        navigate('/buscar');
    };

    useEffect(() => {
        if (!search.realTimeSearch) setSearchForm(search.searchQuery);
    }, [search.realTimeSearch, search.searchQuery]);

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
