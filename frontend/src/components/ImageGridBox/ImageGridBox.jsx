import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import Card from 'material-ui/Card/Card'
import Subheader from 'material-ui/Subheader'
import Radium from 'radium'

const propTypes = {

}

const tilesData = [
  {
    img: 'http://lorempixel.com/200/200/people/1',
    name: 'Chris',
    mutualConnects: '2',
  },
  {
    img: 'http://lorempixel.com/200/200/people/2',
    name: 'Rohan',
    mutualConnects: '2',
  },
  {
    img: 'http://lorempixel.com/200/200/people/3',
    name: 'Lars',
    mutualConnects: '2',
  },
  {
    img: 'http://lorempixel.com/200/200/people/4',
    name: 'Sina',
    mutualConnects: '2',
  },
  {
    img: 'http://lorempixel.com/200/200/people/5',
    name: 'Andy',
    mutualConnects: '2',
  },
]

function ImageGridBox() {
  const styles = getStyles()

  return (
    <div style={styles.root}>
      <Card>
        <GridList
          cellHeight={150}
          style={styles.gridList}
        >
          <Subheader>Connects</Subheader>
          {tilesData.map((tile) => (
            <GridTile
              key={tile.img}
              title={tile.name}
              subtitle={<span>Mutual Connects: <b>{tile.mutualConnects}</b></span>}
            >
              <img src={tile.img} alt={'Friend'} />
            </GridTile>
          ))}
        </GridList>
      </Card>
    </div>
  )
}

function getStyles() {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 350,
      height: 350,
      overflowY: 'auto',
      marginBottom: 24,
    },
  }
}

ImageGridBox.propTypes = propTypes

export default Radium(ImageGridBox)
