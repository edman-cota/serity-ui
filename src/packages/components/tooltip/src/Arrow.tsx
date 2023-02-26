import styled from 'styled-components'

interface StyleProps {
  show: number
  position: any
  bg: string
}

export const Arrow = styled.span<StyleProps>`
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  width: 0px;
  height: 0px;
  z-index: 99999;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid ${(props) => props.bg};

  opacity: ${(props) => props.show}
`
