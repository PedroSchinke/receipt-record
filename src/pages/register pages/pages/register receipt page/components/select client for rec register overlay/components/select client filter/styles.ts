import styled from 'styled-components'
import { BaseButton } from '../../../../../../../../styles/style-bases'

export const FilterContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  color: ${(props) => props.theme.base_subtitle};

  .main_label {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    color: ${(props) => props.theme.base_text};
  }

  #name {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => props.theme.base_input};
    font-family: 'Roboto', sans-serif;
    font-size: 1.3rem;
    color: ${(props) => props.theme.base_label};

    &::placeholder {
      font-size: 1.1rem;
      font-style: italic;
    }
  }
`

export const FilterForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const FilterErrorMessage = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.theme.red};
`

export const FilterButton = styled(BaseButton)`
  margin-top: 10px;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

export const OverlayContent = styled.div`
  width: 70%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 48%;
  left: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  z-index: 1000;

  a {
    width: 45%;
    height: 2.8rem;
  }
`

export const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(props) => props.theme.base_text};
  text-align: center;
`

export const OverlayBackButton = styled(BaseButton)`
  width: 100%;
  height: 100%;
`
