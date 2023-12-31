import styled from 'styled-components'

export const ClientSearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
`

export const DivisionCardLine = styled.div`
  width: 90%;
  height: 1px;
  background-color: ${(props) => props.theme.base_hover};
`

export const ClientSearchResultInfos = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  color: ${(props) => props.theme.base_text};
  cursor: pointer;
  transition: 0.3s;

  .client_and_email {
    display: flex;
    flex-direction: column;

    #name {
      transition: 0.3s;
    }
  }

  &:hover {
    #name {
      color: ${(props) => props.theme.blue_dark};
    }
  }
`
