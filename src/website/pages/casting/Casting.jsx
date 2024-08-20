import { CastingHeader } from './header/CastingHeader';
import { CastingBody } from './body/CastingBody';
import './style.scss';
import CastingFooter from './castingFooterCreds/CastingFooter';

const Casting = () => {
  return (
    <div className="casting-mainpage">
      <CastingHeader />
      <CastingBody />
      <CastingFooter />
    </div>
  );
};

export default Casting;
