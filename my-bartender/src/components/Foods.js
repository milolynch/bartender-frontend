import React, {useEffect, useState} from 'react';

function Foods() {

    const [foods, setFoods] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:3000/foods",{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => setFoods(data))
      }, [])

      


    return (
        <div>
            <h3>Menu</h3>
            {foods.map(food => {
                return <p key = {food.id}>{food.name}</p>
            })}
        </div>
    );
}

export default Foods;