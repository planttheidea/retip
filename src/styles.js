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

/**
 * @function getActiveStateStyles
 *
 * @description
 * get the dynamic styles based on whether the tooltip is active
 *
 * @param {boolean} isActive is the tooltip in an active state
 * @returns {string} the style
 */
export const getActiveStateStyles = ({isActive}) =>
  isActive ? 'opacity: 1; visibility: visible;' : 'opacity: 0; visibility: hidden;';

/**
 * @function getBackgroundColor
 *
 * @description
 * get the background color from props
 *
 * @param {string} backgroundColor the background color in props
 * @returns {string} the background color
 */
export const getBackgroundColor = ({backgroundColor}) => backgroundColor;

/**
 * @function getBoxShadowColor
 *
 * @description
 * get the shadow color from props
 *
 * @param {string} shadowColor the shadow color in props
 * @returns {string} the shadow color
 */
export const getBoxShadowColor = ({shadowColor}) => shadowColor;

/**
 * @function getInverseColor
 *
 * @description
 * get the color that provides appropriate contrast to the background color
 *
 * @param {string} backgroundColor the background color in props
 * @returns {string} the color inverse of the background color
 */
export const getInverseColor = ({backgroundColor}) =>
  color(backgroundColor).isLight() ? INVERSE_COLOR : BACKGROUND_COLOR;

/**
 * @function getContainerDisplay
 *
 * @description
 * get the display value for the container
 *
 * @param {boolean} isBlock should the container be a block element
 * @returns {string} the display value
 */
export const getContainerDisplay = ({isBlock}) => (isBlock ? 'block' : 'inline-block');

/**
 * @function getComputedMaxHeight
 *
 * @description
 * get the maxHeight value based on alignment and position
 *
 * @param {string} alignment the alignment of the tooltip
 * @param {Object} position the calculated position of the item being tipped
 * @returns {number} the computed maxHeight value
 */
export const getComputedMaxHeight = ({alignment, position}) =>
  alignment === 'bottom' ? window.innerHeight - position.bottom : position.top;

/**
 * @function getComputedMaxWidth
 *
 * @description
 * get the maxWidth value based on alignment and position
 *
 * @param {string} alignment the alignment of the tooltip
 * @param {Object} position the calculated position of the item being tipped
 * @returns {number} the computed maxWidth value
 */
export const getComputedMaxWidth = ({alignment, position}) =>
  alignment === 'left' ? position.left : window.innerWidth - (alignment === 'right' ? position.right : position.left);

/**
 * @function createGetMaxDimension
 *
 * @description
 * create a method that gets a specific dimesion max value
 *
 * @param {string} dimension the dimension being calculated
 * @param {function} getComputedDimension the function that gets the computed dimension being calculated
 * @returns {function(Object): number} the function to calculate the dimension requested
 */
export const createGetMaxDimension = (dimension, getComputedDimension) => (props) =>
  props[dimension] === 'none'
    ? getComputedDimension(props)
    : typeof props[dimension] === 'number'
      ? Math.min(getComputedDimension(props), props[dimension])
      : props[dimension];

export const getMaxHeight = createGetMaxDimension('maxHeight', getComputedMaxHeight);
export const getMaxWidth = createGetMaxDimension('maxWidth', getComputedMaxWidth);

/**
 * @function getMaxDimensions
 *
 * @description
 * get the dynamic max-height and max-width values based on the props passed
 *
 * @param {Object} props the props passed to the component
 * @returns {string} the max-height and max-width values
 */
export const getMaxDimensions = (props) => `
  max-height: ${getMaxHeight(props)}px;
  max-width: ${getMaxWidth(props)}px; 
`;

/**
 * @function getNormalizedOffset
 *
 * @description
 * get the offset object normalized with the values passed
 *
 * @param {Object} [offsetPassed] the offset object passed
 * @returns {Object} the offset object normalized
 */
export const getNormalizedOffset = (offsetPassed) => ({
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  ...offsetPassed,
});

/**
 * @function getPositionStyles
 *
 * @description
 * get the dynamic styles for each tooltip position based on the props passed
 *
 * @param {string} alignment the alignment of the tooltip
 * @param {Object} [offset] the offset values passed
 * @param {Object} positiont the position of the item being tipped
 * @returns {string} the position styles
 */
export const getPositionStyles = ({alignment, offset: offsetPassed, position}) => {
  const offset = getNormalizedOffset(offsetPassed);

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

/**
 * @function getTriangleBoxShadowColor
 *
 * @description
 * get the box-shadow color of the triangle
 *
 * @param {Object} props the props passed
 * @returns {string} the box-shadow color
 */
export const getTriangleBoxShadowColor = (props) =>
  color(getBoxShadowColor(props))
    .fade(TRIANGLE_FADE)
    .string();

/**
 * @function getTriangleStyles
 *
 * @description
 * get the dynamic styles for the triangle based on the props passed
 *
 * @param {string} alignment the alignment of the tooltip
 * @returns {string} the triangle styles
 */
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

/**
 * @function getWrapperMaxDimensions
 *
 * @description
 * get the dynamic max-height and max-width values based on the props passed
 *
 * @param {Object} props the props passed to the component
 * @returns {string} the max-height and max-width values
 */
export const getWrapperMaxDimensions = (props) => `
  max-height: ${getMaxHeight(props) - CONTAINER_PADDING * CONTAINER_PADDING_MULTIPLIER}px;
  max-width: ${getMaxWidth(props) - CONTAINER_PADDING * CONTAINER_PADDING_MULTIPLIER}px;  
`;
