import { ContainerCSS } from '../../components/ui/ui.styles.js';
import { AdminTabs } from '../../components/tabs/AdminTabs.jsx';

export const Admin = () => {
  return (
    <ContainerCSS maxWidth="lg">
      <AdminTabs />
    </ContainerCSS>
  );
};
