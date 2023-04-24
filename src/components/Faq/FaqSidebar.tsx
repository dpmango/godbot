import { SpriteIcon } from '@ui';

interface IFaqSidebarProps {
  category: string;
  searchActive: boolean;
  setCategory: (x: string) => void;
}

export const FaqSidebar: React.FC<IFaqSidebarProps> = ({ category, searchActive, setCategory }) => {
  const { t, i18n } = useTranslation('faq', { keyPrefix: 'categories' });

  const menu = useMemo(() => {
    return [
      {
        id: 'start',
        icon: 'home',
        title: t('start'),
      },
      {
        id: 'account',
        icon: 'user',
        title: t('account'),
      },
      {
        id: 'billing',
        icon: 'money',
        title: t('billing'),
      },
      // {
      //   id: 'features',
      //   icon: 'rocket',
      //   title: t('features'),
      // },
      // {
      //   id: 'other',
      //   icon: 'dots',
      //   title: t('other'),
      // },
    ];
  }, [i18n.language]);

  return (
    <div className="faq__menu">
      <div className="swiper swiper--faq">
        <div className="swiper-wrapper">
          {menu.map((li, idx) => (
            <div className="swiper-slide" key={idx}>
              <a
                className={cns(
                  'faq__menu-link',
                  !searchActive && li.id === category && 'faq__menu-link--active'
                )}
                onClick={() => setCategory(li.id)}>
                <SpriteIcon name={li.icon} width="16" height="16" />
                {li.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
