import React, { PropTypes } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const styles = {

};

const DataPanel = ({name, children, onAddClick}) => (
  <div>
    <Tabs>
      <Tab label={name} onTouchTap={onAddClick} >
        <div>
          {children}
        </div>
      </Tab>
    </Tabs>
  </div>
);

DataPanel.propTypes = {
  name: PropTypes.string.isRequired,
  onAddClick: PropTypes.func
}

export default DataPanel;
