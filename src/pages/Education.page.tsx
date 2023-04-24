import 'react-modal-video/scss/modal-video.scss';

import { EducationSection } from '@c/Education';
import { Layout } from '@c/Layout/Layout';
import { IEducationDto } from '@interface/Education';
import { Helmet } from 'react-helmet';
import ModalVideo from 'react-modal-video';

export const Education = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sections, setSections] = useState<IEducationDto[]>([]);
  const dispatch = useAppDispatch();

  const { videoModal } = useAppSelector((state) => state.uiState);

  useEffect(() => {
    const getEducation = async () => {
      setLoading(true);
      const { data, error } = await api('tutorial/get_education/', {
        method: 'GET',
      });
      setLoading(false);

      if (data) {
        setSections(data);
      }
    };

    getEducation();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Godbot | Education</title>
      </Helmet>

      <div className="content">
        <div className="container">
          {sections.map((section, idx) => (
            <EducationSection key={idx} {...section} />
          ))}
        </div>

        <ModalVideo
          channel={videoModal.channel as 'youtube'}
          isOpen={videoModal.opened}
          videoId={videoModal.id}
          onClose={() => dispatch(setVideoModal({ opened: false }))}
        />
      </div>
    </Layout>
  );
};
