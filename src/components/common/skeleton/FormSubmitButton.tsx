import { FC } from 'react';
import styled from 'styled-components';

interface ButtonTypeProps {
    children: string;
    type?: "button" | "submit" | "reset";
}

const FormSubmitButton: FC<ButtonTypeProps> = ({ children, type = "submit" }) => {
    return (
        <StyledWrapper>
            <button type={type}>{children}</button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
    width: 100%;
    padding: 17px 40px;
    border-radius: 0.75rem;
    cursor: pointer;
    border: 0;
    background: linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234));
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-size: 15px;
    transition: all 0.3s ease;
    color: white;
    font-weight: 500;
  }

  button:hover {
    background: linear-gradient(to right, rgb(67, 56, 202), rgb(126, 34, 206));
    transform: scale(1.02);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  button:active {
    transform: scale(0.98);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }

  @media (prefers-color-scheme: dark) {
    button {
      background: linear-gradient(to right, rgb(99, 102, 241), rgb(168, 85, 247));
    }

    button:hover {
      background: linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234));
    }
  }
`;

export default FormSubmitButton;