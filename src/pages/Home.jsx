import React from 'react';
import MUIAvatar from '@material-ui/core/Avatar';
import MUICard from '@material-ui/core/Card';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUITypography from '@material-ui/core/Typography';

function Home () {

  return (
    <MUICard>
      <MUICardHeader
        title={<MUITypography color="secondary" variant="h2">About Us</MUITypography>}
      />
      <MUICardContent>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <MUIAvatar alt="Phoebe" src="phoebe-sunflower.jpg" style={{ height: 300, width: 300 }} />
          <MUITypography style={{ margin: 8 }} variant="caption">This is Phoebe; isn't she adorable?</MUITypography>
        </div>
        
        <MUITypography variant="body1">Welcome to Phoebe's Garden!  We are a small, family-owned business selling garden plants out of our northwest Columbus, Ohio home.  Check out our inventory and take home some of our lovely plants today!</MUITypography>
      </MUICardContent>
    </MUICard>
  );
}

export default Home;