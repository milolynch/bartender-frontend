import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';


// material-ui CSS
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "50%",
    height: 650,
    marginTop: "1%"
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function TablesMap(props) {

    const classes = useStyles();

    const [tables, setTables] = useState([]);

    //fetching Table data which indludes groups 
    // may need to have a nested includes to add the no_orders, has_ordered, and been_delivered feature
    useEffect(()=> {
      fetch("http://localhost:3000/tables",{
        method: "get",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      }).then(data => data.json())
      .then(data => setTables(data))
    }, [])

    const tableHasGroup = (table) =>
    {
      if (table.group){
        return (groupStatus(table))
      }
      else {
        return (<h3>Table {table.position} is empty!</h3>)
      }

    }

    const groupStatus = (table) => {

      if (table.group.food_groups.length === 0 && table.group.drink_groups.length === 0)
      {
        return (
        <>
          <h3>
            Table {table.position} is occupied with {table.group.num_people} people
          </h3>
          <p>
            Nothing Has been ordered or delivered to this table
          </p>
        </>
        )
      }
      else {
        debugger
        return (
          <>
            <h3>
              Table {table.position} is occupied with {table.group.num_people} people
            </h3>
            <p>
              Something Has been ordered or delivered to this table
            </p>
          </>
        )
      }



      // if (table.group.food_groups === undefined && table.group.drink_groups === undefined)
      // {
      //   debugger
      //   return (
      //     <>
      //     <h3>Table {table.position} is occupied with {table.group.num_people} people</h3>
      //     <h4>Nothing has been ordered yet</h4>
      //     </>)
      // }
      // return (
      // <>
      // <h3>Table {table.position} is occupied with {table.group.num_people} people</h3>
      // </>)
    }


    //JSX with very confusing CSS the Gridlist ul has a margin of -2. Why I do not know
    return (
      <>
      <h3>Table Overview</h3>
        <div className={classes.root}>
          <GridList 
            cellHeight={300} 
            cellWidth={300} 
            className={classes.gridList}

          >
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            </GridListTile>

              {tables.map((table) => (
                <GridListTile 
                  key={table.id} 
                  onClick = {() => props.showTable(table.id)}
                  style = {{border: "solid #000",
                    borderWidth: "1px"}}
                >
                  {tableHasGroup(table)}
              <GridListTileBar
                  title={
                  <Button style = {{ backgroundColor: "#add8e6"}}>{`Table: ${table.position}`}</Button>}
                        actionIcon={
                        <IconButton 
                          aria-label={`info about ${table.position}`} 
                          className={classes.icon}>
                          <InfoIcon />
                        </IconButton>}
              />
              </GridListTile>))}
          </GridList>
        </div>
      </>
    );
}

export default TablesMap;