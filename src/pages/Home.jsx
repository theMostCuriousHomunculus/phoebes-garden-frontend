import React from 'react';
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
        <MUITypography variant="body1">We are a small, family owned business selling plants out of our northwest Columbus, Ohio home!</MUITypography>
      </MUICardContent>
    </MUICard>
  );
}

export default Home;