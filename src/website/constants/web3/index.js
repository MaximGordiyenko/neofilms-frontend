import img1 from '../../assets/images/neonft1.png';
import img2 from '../../assets/images/neonft2.png';
import img3 from '../../assets/images/neonft3.png';

import diamond from '../../assets/images/diamond.png';
import platinum from '../../assets/images/platinum.png';
import gold from '../../assets/images/gold.png';
import genesis from '../../assets/images/genesis.png';

export const NFT_CARDS = [
  {
    img: img1,
    title: 'Project name 1',
    text: 'Et a enim nec ligula enim. Eu lectus facilisi pellentesque massa eu. Turpis nunc aliquam tempor in egestas.',
    progress: 33,
  },
  {
    img: img2,
    title: 'Project name 2',
    text: 'Et a enim nec ligula enim. Eu lectus facilisi pellentesque massa eu. Turpis nunc aliquam tempor in egestas.',
    progress: 50,
  },
  {
    img: img3,
    title: 'Project name 3',
    text: 'Et a enim nec ligula enim. Eu lectus facilisi pellentesque massa eu. Turpis nunc aliquam tempor in egestas.',
    progress: 90,
  },
];

export const STAKING_CARDS = [
  {
    img: diamond,
    type: 'diamond',
    nft_to_stake: '0',
    curr_staked: '0',
    estimated: '15',
    unclaimed: '0.00',
  },
  {
    img: platinum,
    type: 'platinum',
    nft_to_stake: '0',
    curr_staked: '0',
    estimated: '8',
    unclaimed: '0.00',
  },
  {
    img: gold,
    type: 'gold',
    nft_to_stake: '0',
    curr_staked: '0',
    estimated: '4',
    unclaimed: '0.00',
  },
  {
    img: genesis,
    type: 'genesis',
    nft_to_stake: '0',
    curr_staked: '0',
    estimated: '0.40',
    unclaimed: '0.00',
  },
];
