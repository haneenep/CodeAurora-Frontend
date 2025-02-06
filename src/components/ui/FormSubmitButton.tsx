import { FC } from 'react';
import styled from 'styled-components';

interface ButtonTypeProps {
    children : string;
    type ?: "button" | "submit" | "reset";
}

const FormSubmitButton : FC<ButtonTypeProps>= ({children,type = "button"}) => {
  return (
    <StyledWrapper>
      <button type={type}>{children}</button>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  button {
    width:100%;
    padding: 17px 40px;
    border-radius: 11px;
    cursor: pointer;
    border: 0;
    background-color: #FFA500;
    box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 15px;
    transition: all 0.5s ease;
  }

  button:hover {
    letter-spacing: 3px;
    background-color: #FF8300;
    color: hsl(0, 0%, 100%);
    box-shadow: rgba(234, 88, 12, 0.8) 0px 7px 29px 0px;
  }

  button:active {
    letter-spacing: 3px;
    background-color: #FF8300;
    color: hsl(0, 0%, 100%);
    box-shadow: rgba(234, 88, 12, 0.8) 0px 0px 0px 0px;
    transform: translateY(10px);
    transition: 100ms;
  }`;

export default FormSubmitButton;
