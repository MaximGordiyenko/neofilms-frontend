import clipleft from '../../assets/images/clipleft.svg';
import clipright from '../../assets/images/clipright.svg';
export const FilledButton = ({ btnText }) => {
  return (
    <div className={'filled-button-box'}>
      <img className={'clipleft'} src={clipleft} alt={'f-btn-clipleft'} />
      <div className={'filled-btn-body'}>
        <span>{btnText}</span>
      </div>
      <img className={'clipright'} src={clipright} alt={'f-btn-clipright'} />
    </div>
  );
};
