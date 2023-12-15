import styled from 'styled-components'
import { BaseButton } from '../../../register pages/pages/register client page/styles'

export const MyActivitiesLayout = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.theme.base_text};
`

export const MyActivitiesContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 10px;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0px 0px 10px ${(props) => props.theme.base_hover};

  #back_button_container {
    width: 85%;
    display: flex;

    a {
      width: fit-content;

      #back_button {
        display: flex;
        align-items: center;
        border: none;
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.base_label};
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  h1 {
    font-size: 2rem;
    margin-top: -5px;
    font-family: 'Inter', sans-serif;
    color: ${(props) => props.theme.blue_dark};
  }
`

export const MyActivitiesFilter = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
      background-color: ${(props) => props.theme.base_input};
      font-family: 'Roboto', sans-serif;
      font-size: 1.3rem;
      color: ${(props) => props.theme.base_label};

      &::placeholder {
        font-size: 1.1rem;
        font-style: italic;
      }
    }
  }
`

export const FilterButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
`

export const ActivitiesResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px 0 10px;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0px 0px 10px ${(props) => props.theme.base_hover};

  p {
    width: 90%;
    margin-bottom: 15px;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${(props) => props.theme.base_label};
  }
`