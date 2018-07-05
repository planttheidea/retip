// external dependencies
import PropTypes from 'prop-types';
import React from 'react';
import {createComponent} from 'react-parm';
import {measure} from 'remeasure';
import styled from 'styled-components';

// constants
import {
  BACKGROUND_COLOR,
  CONTAINER_PADDING,
  INVERSE_COLOR,
  MAX_HEIGHT,
  MAX_WIDTH
} from './constants';

// styles
import {
  getActiveStateStyles,
  getBackgroundColor,
  getBoxShadowColor,
  getContainerDisplay,
  getNormalizedOffset,
  getPositionStyles,
  getInverseColor,
  getMaxDimensions,
  getTriangleBoxShadowColor,
  getTriangleStyles,
  getWrapperMaxDimensions
} from './styles';

export const Container = styled.span`
  display: ${getContainerDisplay};
  position: relative;
`;

export const TooltipContainer = styled.div`
  box-sizing: border-box;
  min-width: 100px;
  padding: ${CONTAINER_PADDING}px;
  position: fixed;
  transition: opacity 150ms ease-in-out, visibility 150ms ease-in-out;
  z-index: 1;

  ${getPositionStyles};
  ${getMaxDimensions};
  ${getActiveStateStyles};
`;

export const TooltipWrapper = measure(['height', 'width'], {namespace: 'dimensions'})(styled.div`
  box-shadow: 0 0 4px ${getBoxShadowColor};

  ${getWrapperMaxDimensions};
`);

export const Tooltip = styled.div`
  background-color: ${getBackgroundColor};
  border-radius: 5px;
  box-sizing: border-box;
  color: ${getInverseColor};
  height: 100%;
  max-height: inherit;
  max-width: inherit;
  overflow: auto;
  padding: 0.5em;
  width: 100%;

  &::after {
    border: 0.5em solid black;
    border-color: transparent transparent ${getBackgroundColor} ${getBackgroundColor};
    box-shadow: -1px 1px 1px 0 ${getTriangleBoxShadowColor};
    box-sizing: border-box;
    content: '';
    height: 0;
    position: absolute;
    transform-origin: 0 0;
    width: 0;

    ${getTriangleStyles};
  }
`;

/**
 * @constant {Object} INITIAL_STATE
 */
export const INITIAL_STATE = {
  isActive: false,
};

/**
 * @function createOnHover
 *
 * @description
 * create the onMouseEnter / onMouseLeave event handlers
 *
 * @param {boolean} isActive should the state be set to active
 * @returns {function(ReactComponent): void} the handler
 */
export const createOnHover = (isActive) => (instance) => {
  if (isActive) {
    clearTimeout(instance.delayTimeout);

    return instance.setState(() => ({
      isActive,
    }));
  }
  // eslint-disable-next-line no-param-reassign
  instance.delayTimeout = setTimeout(() => {
    instance.setState(() => ({
      isActive,
    }));
  }, instance.props.hideDelay);
};

export const Retip = createComponent(
  (
    {
      alignment,
      backgroundColor,
      children,
      isActive: isActiveFromParent,
      isBlock,
      maxHeight,
      maxWidth,
      message,
      offset,
      position,
      shadowColor,
    },
    {onMouseEnter, onMouseLeave, state: {isActive}}
  ) => (
    <Container
      isBlock={isBlock}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}

      <TooltipContainer
        alignment={alignment}
        isActive={isActiveFromParent || isActive}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        offset={offset}
        position={position}
      >
        <TooltipWrapper
          alignment={alignment}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          position={position}
          shadowColor={shadowColor}
        >
          <Tooltip
            alignment={alignment}
            backgroundColor={backgroundColor}
            shadowColor={shadowColor}
          >
            {message}
          </Tooltip>
        </TooltipWrapper>
      </TooltipContainer>
    </Container>
  ),
  {
    delayTimeout: null,
    onMouseEnter: createOnHover(true),
    onMouseLeave: createOnHover(false),
    state: INITIAL_STATE,
  }
);

Retip.displayName = 'Retip';

Retip.propTypes = {
  alignment: PropTypes.oneOf(['bottom', 'left', 'right', 'top']).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  hideDelay: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isBlock: PropTypes.bool.isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  message: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node, PropTypes.string]),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  offset: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  position: PropTypes.shape({
    bottom: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
  shadowColor: PropTypes.string.isRequired,
};

Retip.defaultProps = {
  alignment: 'top',
  backgroundColor: BACKGROUND_COLOR,
  hideDelay: 0,
  isActive: false,
  isBlock: false,
  maxHeight: MAX_HEIGHT,
  maxWidth: MAX_WIDTH,
  offset: getNormalizedOffset(),
  shadowColor: INVERSE_COLOR,
};

export default measure(['bottom', 'left', 'height', 'right', 'top', 'width'], {
  namespace: 'position',
  renderOnWindowResize: true,
})(Retip);
