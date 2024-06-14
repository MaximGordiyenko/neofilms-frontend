import { Link } from "react-router-dom";
import { styled, Box } from "@mui/material";
import joblify from '../../assets/neoLogo.png';

export const Logo = () => {
  return (
    <Link to='/'>
      <BoxCSS
        component="img"
        alt="Joblify"
        src={joblify}
      />
    </Link>
  );
};

const BoxCSS = styled(Box)`
  transform: scale(4);
  width: 150px;
  height: 50px;
`;
