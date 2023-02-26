import React, { useState, useRef } from 'react'
import Portal from './Portal'
import { TooltipProps } from './types'
import { computePostion } from './computePosition'
import { StyledTooltip, StyledCommand, StyledSeparator } from './StyledTooltip'
import { Arrow } from './Arrow'

function Tooltip({
  label,
  placement = 'bottom',
  offset = 8,
  hasArrow=false,
  borderRadius = 'base',
  disabled = 0,
  command,
  commandColor = 'white',
  commandBg = 'rgba(255, 255, 255, .2)',
  bg = 'rgba(0, 5, 11, 0.9)',
  color = 'rgba(255, 255, 255, 1)',
  children,
}: TooltipProps) {
  const [show, setShow] = useState<number>(0)
  const positionRef = useRef({ x: 0, y: 0 })
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0})
  const tooltipRef = useRef<HTMLDivElement>(null)
  const ARROWSIZE = 5;

  const handleMouseOver = (e: any) => {
    setShow(1)

    positionRef.current = computePostion(
      e.currentTarget,
      tooltipRef.current,
      placement,
      offset,
    )

    const element = e.currentTarget.getBoundingClientRect()
    const x = Math.round(element.left + (e.currentTarget.offsetWidth / 2) - ARROWSIZE)
    const y = Math.round(positionRef.current.y - ARROWSIZE);
    setArrowPosition({x: x, y: y})
    console.log('Arrow pos: ', arrowPosition )
  }
  const handleMouseOut = () => setShow(0)


  let commands: string[] = []

  if (command?.includes('+')) {
    commands = command?.split('+')
  } else {
    commands.push(command!)
  }

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(children, {
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut,
          })}
      {disabled || (
        <Portal>
          <StyledTooltip
            ref={tooltipRef}
            positionRef={positionRef}
            show={show}
            radius={borderRadius}
            placement={placement}
            bg={bg}
            color={color}
            role='tooltip'
          >
            {label}
            {command !== undefined ? (
              <>
                <span style={{ margin: '0 7px' }}>·</span>
                {commands?.map((command, index) => (
                  <>
                    <StyledCommand background={commandBg} color={commandColor}>
                      {command}
                    </StyledCommand>
                    {commands.length > 1 && index < commands.length - 1 ? (
                      <StyledSeparator>+</StyledSeparator>
                    ) : null}
                  </>
                ))}
              </>
            ) : null}
          </StyledTooltip>
          {hasArrow && (
            <Arrow show={show} position={arrowPosition} bg={bg}/>
          )}
        </Portal>
      )}
    </>
  )
}

export default Tooltip
