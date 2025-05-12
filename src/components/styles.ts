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
