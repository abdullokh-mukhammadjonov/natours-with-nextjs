import React, { useState } from "react";


const App = () => {

  const [formValues, setFormValues] = useState([
    { orderno: 0, inputValue1: "", inputValue2: "", checked: false }
  ]);

  // control order number in a state to make sure
  // that it does not get messed when you remove
  // an indice from formValues
  // !! default was 0. so set it to 1
  const [orderNumber, setOrderNumber] = useState(1)


  const addFormFields = () => {
    setFormValues(prevState => [
      ...prevState,
      {
        orderno: orderNumber,
        inputValue1: '', 
        inputValue2: '', 
        checked: false 
      }
    ]);
    // increment order number
    setOrderNumber(prev => prev+1)
  };


  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);

    setFormValues(newFormValues);

    // decrement order number
    setOrderNumber(prev => prev-1)
  };


  const onChangeFieldValue = (index, key, value) => {
    setFormValues(prevState => {
      let copyState = [...prevState]

      if(value === 'toggle') // toggle 'checked' key
        copyState[index][key] = !copyState[index][key]
      else
        copyState[index][key] = value

      return copyState
    })
  }

  const saveFields = (e) => {
    const queryparam = {
      data: "xxx",
      DbData: "xxx",
      SQlData: "xxx", // only checked ones
      overallData: formValues.filter(el => el.checked)
    };
    console.log(queryparam)
    //axios.post('..',queryparam)
  };
  return (
    <>
      {formValues.length <= 4
        ? formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label>{index + 1}</label>

              <input
                type="text"
                value={element.inputVal1}
                onChange={(e) => onChangeFieldValue(index, 'inputValue1', e.target.value)}
              />
              <input
                type="text"
                value={element.inputVal2}
                onChange={(e) => onChangeFieldValue(index, 'inputValue2', e.target.value)}
              />
              <input 
                type="checkbox"
                checked={element.checked}
                onChange={(e) => onChangeFieldValue(index, 'checked', 'toggle')}/>
              <button
                className="button add"
                type="button"
                onClick={() => addFormFields()}
              >
                Add
              </button>

              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            </div>
          ))
        : ""}
      <button
        type="button"
        className="button remove"
        onClick={(e) => saveFields(e)}
      >
        Save
      </button>
      <button
        type="button"
        className="button remove"
        onClick={(e) => cancelFields(e)}
      >
        cancel
      </button>
    </>
  );
};

export default App;
