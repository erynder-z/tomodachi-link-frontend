import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../UiElements/LoadingSpinner/LoadingSpinner';
import { SearchResultType } from '../../types/searchTypes';
import SearchInput from './SearchInput/SearchInput';
import SearchResults from './SearchResults/SearchResults';
import SpyGlassIcon from './SpyGlassIcon/SpyGlassIcon';
import NoResultsFound from './SearchResults/NoResultsFound/NoResultsFound';
import ClearButton from './ClearButton/ClearButton';

type SearchPropsType = {
    handleCloseButtonClick: () => void;
};

export default function Search({ handleCloseButtonClick }: SearchPropsType) {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounce = useRef<NodeJS.Timeout | null>(null);

    const DEBOUNCE_TIMEOUT = 500;

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setIsDebouncing(false);
                setIsLoading(true);
                const serverURL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(
                    `${serverURL}/api/v1/search?query=${searchText}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (debounce.current) {
            clearTimeout(debounce.current);
        }

        setIsDebouncing(true);
        debounce.current = setTimeout(() => {
            if (searchText) {
                fetchSearchResults();
            } else {
                setSearchResults([]);
            }
        }, DEBOUNCE_TIMEOUT);
    }, [searchText]);

    const Loading = (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner message="Searching" />
        </div>
    );

    return (
        <div className="relative z-0 px-4 w-full" ref={dropdownRef}>
            <SearchInput
                searchText={searchText}
                setSearchText={setSearchText}
            />
            {isDebouncing && searchText ? (
                Loading
            ) : isLoading ? (
                Loading
            ) : searchResults.length > 0 && Array.isArray(searchResults) ? (
                <SearchResults
                    searchText={searchText}
                    searchResults={searchResults}
                    handleCloseButtonClick={handleCloseButtonClick}
                />
            ) : searchText ? (
                <NoResultsFound />
            ) : (
                <SpyGlassIcon />
            )}
            {searchText && (
                <ClearButton
                    setSearchText={setSearchText}
                    setSearchResults={setSearchResults}
                />
            )}
        </div>
    );
}