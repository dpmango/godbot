import { IVideoDto } from '@interface/Education';
import { LockScreen } from '@ui';

interface IEducationCardProps extends IVideoDto {
  access_level: number;
}

export const EducationCard: React.FC<IEducationCardProps> = ({
  preview_image,
  link,
  tags,
  access_level,
  themes,
  result,
}) => {
  const { userData } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const { t } = useTranslation('education', { keyPrefix: 'card' });

  const tagsList = useMemo(() => {
    if (!tags) return null;
    return tags.split(';');
  }, [tags]);

  const themesList = useMemo(() => {
    if (!themes) return null;
    return themes.split(';').map((x) => x.trim());
  }, [themes]);

  const handleVideoOpen = (e: any) => {
    e.preventDefault();

    const [_, id] = (link || '').split('?v=');
    if (id) dispatch(setVideoModal({ opened: true, id: id }));
  };

  const isAllowed = (userData?.access_level || 0) >= access_level;

  return (
    <div className="education__block">
      <a
        className="education__block-preview"
        href={link || '#'}
        target={link ? '_blank' : ''}
        onClick={(e) => handleVideoOpen(e)}
        rel="noopener noreferrer">
        <img src={preview_image} alt="" />
        <span className="education__block-play">
          <img src="/img/play.svg" alt="" />
        </span>

        {!isAllowed && <LockScreen section={t('lock')} />}

        {/* <div className="education__block-viewed">{t('viewed')}</div> */}
      </a>

      {tagsList && (
        <div className="education__block-tags">
          {tagsList.map((tag, idx) => (
            <div key={idx}>{tag}</div>
          ))}
        </div>
      )}

      <div className="education__block-top">
        <div className="education__block-title">{t('themes')}</div>
        {themesList && (
          <ul>
            {themesList.map((li, idx) => (
              <li key={idx}>{li}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="education__block-bottom">
        <div className="education__block-title education__block-title--green">{t('result')}</div>
        {result}
      </div>
    </div>
  );
};
