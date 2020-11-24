import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function FoodForm(props) {
  const classes = useStyles();
  const [foodId, setFoodId] = useState('');

  const handleChange = (event) => {
    setFoodId(event.target.value);
  };

  const [foods, setFoods] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3000/foods",{
      method: "get",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}
    }).then(data => data.json())
    .then(data => setFoods(data))
  }, [])

  const addFood = (id) => {
      console.log()
      let order = {
          group_id: props.groupId,
          food_id: id
      }
      fetch(`http://localhost:3000/food_groups/`, {
        method: "post",
        mode: 'cors',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(order)
      }).then(response => response.json())
      .then(res => console.log(res))

  }
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {foods.map(food => (
              <option value = {food.id}>{food.name}</option>
          ))}
        </NativeSelect>
        <Button

            style = {{
                backgroundColor: "#03cffc",
                marginTop: "1%"
            }}
            onClick = {() =>addFood(foodId)}
        >
            Add to order
        </Button>
      </FormControl>
    </div>
  );
}