import styled from "styled-components";

export const SearchPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SearchBar = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  input {
    width: 100%;;
    padding: 2px 20px;
    font-size: 0.8rem;
    border: none;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: scale(1.02)
    }
  }
`

