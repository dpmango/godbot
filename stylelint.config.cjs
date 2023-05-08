/* eslint-env node */
module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [null],
    'function-no-unknown': [true, { ignoreFunctions: ['theme'] }],
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'import-notation': null,
    'number-max-precision': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['global'],
      },
    ],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [
      'position',
      'content',
      'overflow',
      'display',
      'top',
      'left',
      'right',
      'bottom',
      'z-index',
      'flex',
      'flex-direction',
      'flex-basis',
      'justify-content',
      'align-items',
      'grid',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'margin',
      'margin-top',
      'margin-left',
      'margin-right',
      'margin-bottom',
      'padding',
      'padding-top',
      'padding-left',
      'padding-right',
      'padding-bottom',
      'font-family',
      'font-weight',
      'font-size',
      'line-height',
      'text-align',
      'text-decoration',
      'color',
      'background',
      'border',
      'border-top',
      'border-left',
      'border-bottom',
      'border-right',
      'border-radius',
      'opacity',
      'transform',
      'pointer-events',
      'will-change',
      'backface-visibility',
      'transition',
    ],
  },
};
