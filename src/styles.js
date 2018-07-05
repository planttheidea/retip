// external dependencies
import color from 'color';

// constants
import {
  BACKGROUND_COLOR,
  CONTAINER_PADDING,
  CONTAINER_PADDING_MULTIPLIER,
  INVERSE_COLOR,
  TRIANGLE_FADE
} from './constants';

export const getActiveStateStyles = ({isActive}) =>
  isActive ? 'opacity: 1; visibility: visible;' : 'opacity: 0; visibility: hidden;';

export const getBackgroundColor = ({backgroundColor}) => backgroundColor;

export const getBoxShadowColor = ({shadowColor}) => shadowColor;

export const getInverseColor = ({backgroundColor}) =>
  color(backgroundColor).isLight() ? INVERSE_COLOR : BACKGROUND_COLOR;

export const getContainerDisplay = ({isBlock}) => (isBlock ? 'block' : 'inline-block');

export const getComputedMaxHeight = ({alignment, position}) =>
  alignment === 'bottom' ? window.innerHeight - position.bottom : position.top;

export const getComputedMaxWidth = ({alignment, position}) =>
  alignment === 'left' ? position.left : window.innerWidth - (alignment === 'right' ? position.right : position.left);

export const createGetMaxDimension = (dimension, getComputedDimension) => (props) =>
  props[dimension] === 'none'
    ? getComputedDimension(props)
    : typeof props[dimension] === 'number'
      ? Math.min(getComputedDimension(props), props[dimension])
      : props[dimension];

export const getMaxHeight = createGetMaxDimension('maxHeight', getComputedMaxHeight);
export const getMaxWidth = createGetMaxDimension('maxWidth', getComputedMaxWidth);

export const getMaxDimensions = (props) => `
  max-height: ${getMaxHeight(props)}px;
  max-width: ${getMaxWidth(props)}px; 
`;

export const getDefaultOffset = (offsetPassed) => ({
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  ...offsetPassed,
});

export const getPositionStyles = ({alignment, offset: offsetPassed, position}) => {
  const offset = getDefaultOffset(offsetPassed);

  switch (alignment) {
    case 'bottom':
      return `
        left: ${position.left + offset.left}px;
        top: ${position.bottom + offset.top}px;
        transform: translateX(-25px);
      `;

    case 'left':
      return `
        left: ${position.left + offset.left}px;
        top: ${position.top + offset.top}px;
        transform: translate(-100%, -24px);
      `;

    case 'right':
      return `
        left: ${position.right + offset.left}px;
        top: ${position.top + offset.top}px;
        transform: translateY(-24px);
      `;

    default:
      return `
        left: ${position.left + offset.left}px;
        top: ${position.top + offset.top}px;
        transform: translate(-25px, -100%);
      `;
  }
};

export const getTriangleBoxShadow = (props) =>
  color(getBoxShadowColor(props))
    .fade(TRIANGLE_FADE)
    .string();

export const getTriangleStyles = ({alignment}) => {
  switch (alignment) {
    case 'bottom':
      return `
        left: 43px;
        top: 16px;
        transform: rotate(135deg);
      `;

    case 'left':
      return `
        right: 0;
        top: 43px;
        transform: rotate(225deg);
      `;

    case 'right':
      return `
        left: 15px;
        top: 22px;
        transform: rotate(45deg);
      `;

    default:
      return `
        bottom: 0;
        left: 18px;
        transform: rotate(-45deg);
      `;
  }
};

export const getWrapperMaxDimensions = (props) => `
  max-height: ${getMaxHeight(props) - CONTAINER_PADDING * CONTAINER_PADDING_MULTIPLIER}px;
  max-width: ${getMaxWidth(props) - CONTAINER_PADDING * CONTAINER_PADDING_MULTIPLIER}px;  
`;
