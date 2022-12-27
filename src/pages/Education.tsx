import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useAppDispatch, api } from '@core';
import { IEducationDto } from '@core/interface/Education';

import { Layout } from '@c/Layout/Layout';
import { EducationSection } from '@c/Education';

export const Education: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sections, setSections] = useState<IEducationDto[]>([]);
  const dispatch = useAppDispatch();

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
      </div>
    </Layout>
  );
};
