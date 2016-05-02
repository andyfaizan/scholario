import React, { PropTypes } from 'react'
import List from 'material-ui/lib/lists/list';
import Data from '../Data/Data'

const DataList = ({subfolders, onMaterialClick, onAddClick}) => (
  <List>
      {subfolders.length !== 0 ?
        subfolders.map(subfolder =>
        <Data
          key={subfolder.id}
          {...subfolder}
          onClick={() => onMaterialClick(subfolder.id)}
          name={subfolder.name}
          subtext={subfolder.subtext}
          isFolder={subfolder.isFolder}
          subsubfolders={subfolder.subsubfolders}
        />
    ): <div onClick={onAddClick}>
          <h1>Add some material</h1>
        </div>}
  </List>
);

function lazyFunction(f) {
    return function () {
        return f.apply(this, arguments);
    };
}

var lazyTreeType = lazyFunction(function () {
    return Data.propTypes;
});

DataList.propTypes = {
  subfolders: PropTypes.arrayOf(PropTypes.shape({
    onClick: PropTypes.func,
    name: PropTypes.string.isRequired,
    subtext: PropTypes.string.isRequired,
    isFolder: PropTypes.bool.isRequired,
    subsubfolders: React.PropTypes.arrayOf(lazyTreeType)
  })),
  onMaterialClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
}

export default DataList;
