import React, {
  useEffect, useState, useMemo, useReducer, useRef, useCallback,
} from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { useAsync, useMap } from 'react-use';
import { useRouter } from 'next/router';

import Input from '../../components/Input';
import BaseButton from '../../components/BaseButton';

const Wrapper = styled.div`
  display: flex;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SuggestionsWrapper = styled.div`
  padding: 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px 0px;
  background: #fff;
  border-radius: 6px;
  margin-top: 2px;
  max-height: 400px;
  overflow-y: scroll;
`;

const InputWrapper = styled.div`
  display: flex;
  > div {
    border-left: solid 2px #d8d8d8;
    &:first-child {
      border-left: none;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  overflow: hidden;
  height: 64px;
`;

const SearchButton = styled(BaseButton)`
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  padding-left: 38px;
  padding-right: 38px;
  box-shadow: rgb(0, 0, 0) 2px 2px 6px 0px;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: rgb(104,174,238);
  background: linear-gradient(90deg, rgba(104,174,238,1) 35%, rgba(23,95,172,1) 100%);
  z-index: 2;
`;

const CancelButton = styled(SearchButton)`
  margin-left: -6px;
  background: #3d3d3d;
  box-shadow: none;
  z-index: 1;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Suggestion = styled.li`
  cursor: pointer;
  padding: 20px 26px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: gray;
    background: rgb(255,255,255); /* Old browsers */
  background: -moz-linear-gradient(left,  rgba(255,255,255,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 51%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(255,255,255,1) 0%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 51%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(0,0,0,1) 50%,rgba(0,0,0,1) 51%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */
  }
  ${(props) => props.focused && `
    background: rgb(104,174,238);
  `}
`;

function Customers({ userService }) {
  const router = useRouter();

  const [
    {
      cid, firstName, lastName, mobile,
    },
    { set: setTerm, setAll: setAllTerms, reset: resetTerms },
  ] = useMap({
    cid: '',
    firstName: '',
    lastName: '',
    mobile: '',
  });

  // list of suggestions to render
  const [suggestions, setSuggestions] = useState([]);

  // selected item from the suggestions
  const [searchSelection, setSearchSelection] = useState(null);

  const usersPromise = useAsync(() => {
    if (userService) {
      return userService.find({});
    }
    return Promise.reject();
  }, [userService]);

  const { value: users = [] } = usersPromise;

  const idIndex = useMemo(() => new Fuse(users, { keys: ['cid'] }), [usersPromise]);
  const firstNameIndex = useMemo(() => new Fuse(users, { keys: ['firstName'] }), [usersPromise]);
  const lastNameIndex = useMemo(() => new Fuse(users, { keys: ['lastName'] }), [usersPromise]);
  const mobileIndex = useMemo(() => new Fuse(users, { keys: ['mobile'] }), [usersPromise]);

  const indexes = {
    cid: idIndex,
    firstName: firstNameIndex,
    lastName: lastNameIndex,
    mobile: mobileIndex,
  };

  const onSearch = ({ target }) => {
    const { name, value } = target;
    resetTerms();
    setTerm(name, value);
    setSuggestions(indexes[name].search(value));
    setSearchSelection(null);
  };

  const [focused, updateFocused] = useReducer((index, action) => {
    switch (action.type) {
      // down arrow, when user reaches the last index, keep it there
      case 'increment':
        return Math.min(index + 1, suggestions.length - 1);
      // up arrow, allow the index to go -1 which indicates use is back to search box
      case 'decrement':
        return Math.max(index - 1, -1);
      // change on mouse movement
      case 'change':
        return action.index;
      // reset when term changes
      case 'reset':
        return -1;
      default:
        throw new Error();
    }
  }, -1);

  // ref which points to current focused element, used for scrollIntoView
  const focusedResult = useRef(null);

  // scroll when focused index changes and change display term
  useEffect(() => {
    if (suggestions.length && suggestions[focused]) {
      setTerm(suggestions[focused].item.name);
    }
    if (focusedResult.current) {
      focusedResult.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [focused, suggestions]);

  useEffect(() => updateFocused({ type: 'reset' }), [suggestions]);

  const onSelect = (suggestion) => {
    setSearchSelection(suggestion);
    setAllTerms({
      cid: suggestion.item.cid,
      firstName: suggestion.item.firstName,
      lastName: suggestion.item.lastName,
      mobile: suggestion.item.mobile,
    });
    setSuggestions([]);
  };

  // handle search box keyboard events
  const onSearchBoxKey = ({ key }) => {
    // if user hits enter (equivalanet to hitting search button)
    // Hide suggestions, you should. Search you must.
    if (key === 'Enter') {
      if (suggestions.length) {
        if (focused !== -1 && suggestions[focused]) {
          return onSelect(suggestions[focused]);
        }
        return onSelect(suggestions[0]);
      }
      return null;
    }

    if (key === 'ArrowDown') {
      return updateFocused({ type: 'increment' });
    }

    if (key === 'ArrowUp') {
      return updateFocused({ type: 'decrement' });
    }

    return updateFocused({ type: 'reset' });
  };

  const showUser = useCallback(() => {
    if (searchSelection) {
      router.push('/customers/[id]', `/customers/${searchSelection.item.id}`);
    }
  }, [searchSelection]);

  return (
    <Wrapper>
      <SearchWrapper>
        <InputWrapper>
          <Input
            label='Customer ID'
            name='cid'
            value={cid}
            onChange={onSearch}
            onKeyDown={onSearchBoxKey}
          />
          <Input
            label='First Name'
            name='firstName'
            value={firstName}
            onChange={onSearch}
            onKeyDown={onSearchBoxKey}
          />
          <Input
            label='Last Name'
            name='lastName'
            value={lastName}
            onChange={onSearch}
            onKeyDown={onSearchBoxKey}
          />
          <Input
            label='Mobile Number'
            name='mobile'
            value={mobile}
            onChange={onSearch}
            onKeyDown={onSearchBoxKey}
          />
        </InputWrapper>
        {(cid || firstName || lastName || mobile) && !searchSelection && (
          <SuggestionsWrapper>
            <SuggestionsList>
              {suggestions.length ? suggestions.map((result, index) => (
                <Suggestion
                  key={result.item.id}
                  focused={index === focused}
                  ref={index === focused ? focusedResult : null}
                  onMouseMove={() => updateFocused({ type: 'change', index })}
                  onClick={() => onSelect(suggestions[index])}
                >
                  {`${result.item.firstName} ${result.item.lastName} - ${result.item.cid}`}
                </Suggestion>
              )) : (
                <Suggestion>
                  <p>No user found</p>
                </Suggestion>
              )}
            </SuggestionsList>
          </SuggestionsWrapper>
        )}
      </SearchWrapper>
      <ActionWrapper>
        <SearchButton onClick={showUser}>Go</SearchButton>
        <CancelButton
          onClick={() => {
            resetTerms();
            setSearchSelection(null);
            setSuggestions([]);
          }}
        >
          Cancel
        </CancelButton>
      </ActionWrapper>
    </Wrapper>
  );
}

export default Customers;
