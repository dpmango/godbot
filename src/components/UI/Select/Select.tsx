import { useState, useRef, useMemo } from 'react';
import cns from 'classnames';
import { useTranslation } from 'react-i18next';

import { useClickOutside } from '@hooks';
import { SpriteIcon } from '@ui';

import './select.sass';

interface ISelectProps {
  value: string;
  options: ISelectOption[];
  disabled?: boolean;
  placeholder?: any;
  onSelect?: (x: ISelectOption) => void;
}

export interface ISelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  isPro?: boolean;
  modifier?: string;
  icon?: string;
}

export const Select: React.FC<ISelectProps> = ({
  value,
  options,
  disabled,
  placeholder,
  onSelect,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  const { t } = useTranslation('ui', { keyPrefix: 'select' });

  useClickOutside(wrapperRef, () => setOpened(false));

  const currentTitle = useMemo(() => {
    return options?.find((x) => x.value === value)?.label || placeholder || t('defaultPlaceholder');
  }, [value, options, placeholder]);

  const handleSelect = (option: ISelectOption) => {
    onSelect && onSelect(option);
    setOpened(false);
  };

  return (
    <div className={cns('select', disabled && 'select--disabled')} ref={wrapperRef}>
      <div
        className={cns('select__opener', opened && 'select__opener--active')}
        onClick={() => setOpened(!opened)}>
        {currentTitle}
        <SpriteIcon name="chevrondown" width="18" height="18" />
      </div>
      <div className={cns('select__dropdown', opened && 'select__dropdown--active')}>
        {options?.length ? (
          options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={cns(
                'select__dropdown-link',
                option.disabled && 'select__dropdown-link--disabled',
                option.modifier && `select__dropdown-link--${option.modifier}`
              )}>
              {option.label}
              {option.isPro && <span className="pro-label">PRO</span>}
              {option.icon && <SpriteIcon name={option.icon} width="12" height="12" />}
            </div>
          ))
        ) : (
          <span>{t('empty')}</span>
        )}
      </div>
    </div>
  );
};
