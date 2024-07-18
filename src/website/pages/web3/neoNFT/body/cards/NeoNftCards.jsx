import './style.scss';
import { NFT_CARDS } from '../../../../../constants/web3';
import ProgressBar from '../../../../../components/progressbar/Progressbar';
import { useEffect, useState } from "react";
import { getProjects, getImage } from "../../../../../../api/project";
import Spinner from "../../../../../components/loader/Spinner";

export const NeoNftCards = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  console.log(projectsData, 'projects');

  return (
    <div className={'cards-nft'}>
      {loading ? (
        <Spinner />
      ) : (
        projectsData.slice(-3).map((item, i) => {
          console.log(item, 'item');
          return (
            <div className={'card-nft'} key={i}>
              <div className={'card-inner-content'}>
                {/*<img src={item.imageUrl} className='image-nft-card' />*/}
                <div className="image-nft-card"
                     style={{
                       backgroundImage: `url(${item.imageUrl})`,
                       backgroundSize: 'cover',
                       backgroundPosition: 'center',
                       backgroundRepeat: 'no-repeat'
                }}/>
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
        })
      )}
    </div>
  );
};
