import './style.scss';
import { NFT_CARDS } from '../../../../../constants/web3';
import ProgressBar from '../../../../../components/progressbar/Progressbar';
import {useEffect, useState} from "react";
import axios from "axios";
import {getProjects} from "../../../../../../api/project";
import {getImage} from "../../../../../../api/project";

export const NeoNftCards = () => {
  const [projectsData,setProjectsData ] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get('http://57.151.104.191:8888/api/pages/projects');
  //       const projectsData = response.data;
  //
  //       const cardsWithImages = await Promise.all(projectsData.map(async (project) => {
  //         const imageResponse = await axios.get(`http://57.151.104.191:8888/api/pages/projects/${project.id}/image`, { responseType: 'blob' });
  //         const imageUrl = URL.createObjectURL(imageResponse.data);
  //         return { ...project, imageUrl };
  //       }));
  //       setProjectsData(cardsWithImages);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchProjects();
  // }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        const projectsData = response.data;

        const cardsWithImages = await Promise.all(projectsData.map(async (project) => {
          const imageUrl = getImage(project.id);
          return { ...project, imageUrl };
        }));

        setProjectsData(cardsWithImages);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  console.log(projectsData, 'projects')
  return (
    <div className={'cards-nft'}>
      {projectsData.slice(-3).map((item, i) => {
        console.log(item, 'item')
        return (
          <div className={'card-nft'} key={i}>
            <div className={'card-inner-content'}>
              <img src={item.imageUrl} className='image-nft-card' />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <ProgressBar progress={item.completion} />
            </div>
            <div className={'pg-bar-points'}>
              <span>pre-prod</span>
              <span>production</span>
              <span>release</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
