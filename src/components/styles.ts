import styled, { css } from 'styled-components'

export const Form = styled.form`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`

export const List = styled.ul`
  margin-top: 2rem;
  list-style: none;
`

export const Item = styled.li`
  display: flex;
  gap: 8px;
  background: #fff;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
`

export const Wrapper = styled.div`
  flex: 1;
`

type ButtonProps = {
  stype: 'default' | 'info' | 'transparent'
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  max-height: 40px;
  padding: 10px 15px;
  border: 1px solid #ededed;
  background: #ededed;
  color: #333;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  ${(props) =>
    props.stype === 'info' &&
    css`
      color: #fff;
      background: #7284ff;
    `}

  ${(props) =>
    props.stype === 'transparent' &&
    css`
      background: transparent;
    `}
`

export const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6rem;
`

export const Input = styled.input`
  flex: 1;

  color: #555555;
  height: 40px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  transition: 0.4s;

  &:focus {
    border-color: #6675df;
  }

  outline: none;
`

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0 30px 30px 0;
  overflow: hidden;
`

type ToastProps = {
  type: 'error' | 'success' | 'default'
}

export const ToastItem = styled.div<ToastProps>`
  width: max-content;
  max-height: 460px;
  padding: 15px 15px 15px 8px;
  box-shadow:
    0 1px 10px 0 rgba(0, 0, 0, 0.1),
    0 2px 15px 0 rgba(0, 0, 0, 0.05);
  user-select: none;
  animation:
    fadeIn 0.6s ease-in forwards,
    fadeOut 0.6s ease-out forwards 6s;
  cursor: pointer;

  background: #fff;
  border-left: 8px solid #d1d5db;

  ${(props) =>
    props.type === 'success' &&
    css`
      border-color: #2ecc7180;
    `}

  ${(props) =>
    props.type === 'error' &&
    css`
      border-color: #e74c3c80;
    `}

    & + div {
    margin-top: 8px;
  }
`
