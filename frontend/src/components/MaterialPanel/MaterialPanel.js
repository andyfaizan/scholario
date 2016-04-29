import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {

};

const MaterialPanel = ({children}) => (
  <div>
    <Tabs>
      <Tab label="Item One" >
        <div>
          {children}
        </div>
      </Tab>
    </Tabs>
  </div>
);

export default MaterialPanel;
