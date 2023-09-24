import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';

//Attribute Component
function Attributes({attribute, onClickPlus, onClickMinus, num, modifier}){
  return <li>{attribute}:{num} (Modifier:{modifier}) <button onClick={onClickPlus}>+</button><button onClick={onClickMinus}>-</button></li> 
}

//Class Component
function Class({onClickClass, classTitle}){
  return <li onClick={onClickClass}>{classTitle} </li>
}

//Main Component
function App() {

  var classMinimum = {};
  var classAttri = [];
  const entries = Object.entries(CLASS_LIST);
  entries.forEach(([key, item]) => {
    const entriesIn = Object.entries(item);
    classAttri = [];
    entriesIn.forEach(([key1, item1]) => {
      
      console.log(key1, item1);
      classAttri.push(item1);
      
    });
    console.log(`classAttri: ${classAttri}`);
    classMinimum[key] = classAttri;
    console.log(`classminimum: ${classMinimum[key]}`);
  });


  //State of the attributes
  const [num, setNum] = useState(Array(ATTRIBUTE_LIST.length).fill(0));
  console.log(`num: ${num}`);

  //State of attribute modifier
  const [modifier, setModifier] = useState(Array(ATTRIBUTE_LIST.length).fill(0));
  console.log(`modifier: ${modifier}`);

  //State of eligible classes
  const [classUi, setClassUi] = useState(Array());
  console.log(`classUi at state init: ${classUi}`);

  //State of Class clicked
  const [classClicked, setClassClicked] = useState();

  //Function to increase attribute  
  function handlePlus(index) {
    console.log(`App >>> Attributes >> handleClickPlus >> attribute increased`)
    const updateNum = num.slice();
    updateNum[index] = num[index]+1;
    var updateClassUi = classUi.slice();
    const updateModifier = modifier.slice();
    updateModifier[index] = calculateModifier(updateNum[index]);
    setNum(updateNum);
    setModifier(updateModifier);
    console.log(`updateNum: ${updateNum}`);

    //Check eligibility for class - incomplete
    Object.keys(classMinimum).forEach((key) => {
      const minimumValues = classMinimum[key];
      var isEligible = true;

      console.log(`minimumValues ${minimumValues}`);
      for(var i = 0; i< minimumValues.length; i++){
        console.log(`index: ${i}`);
        if(updateNum[i] < minimumValues[i]){
          isEligible = false;
          break;    
        } 
      }
        if (isEligible) {
          console.log(`key in isEligible: ${key}`);

          updateClassUi = classUi.push(key) ;
          setClassUi(updateClassUi);
          console.log(`Eligible Class in state: ${classUi}`);
        }
      
      if (!isEligible) {
        console.log("Not eligible for any class");
      }
      });
    }
    
  //Function to decrease attribute 
  function handleMinus(index) {
    console.log(`App >>> Attributes >> handleClickMinus >> attribute decreased`)
    const updateNum = num.slice();
    updateNum[index] = num[index]-1;
    const updateModifier = modifier.slice();
    updateModifier[index] = calculateModifier(updateNum[index]);
    setNum(updateNum);
    setModifier(updateModifier);
    // setClassUi(true);
  }

  //Function to handle class clicked
  function handleClass(classTitle) {
   classTitle === classClicked ? setClassClicked() : setClassClicked(classTitle);
   Object.entries(CLASS_LIST[classTitle]).forEach(([key, value]) => {
    console.log(`${key} : ${value}`)
   })
  }
  
  // Function to calculate the ability modifier
  const calculateModifier = (attributeValue) => {
      return Math.floor((attributeValue - 10) / 2);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          Value:
          <button>+</button>
          <button>-</button>
        </div>
        <div> Attributes:
          <ul>
            {ATTRIBUTE_LIST.map((attribute, index) => 
              <Attributes key = {index} attribute = {attribute} modifier = {modifier[index]} onClickPlus = {() => handlePlus(index)} onClickMinus = {() => handleMinus(index)} num = {num[index]}/>)
              }
          </ul>
        </div>
        <div> Class:
          <ul> 
            {Object.keys(CLASS_LIST).map((classTitle) => 
              <Class onClickClass ={() => handleClass(classTitle)} classTitle = {classTitle}/>
            )} 
          </ul>
          {classClicked && (
            <div>
            Class Minimum Values: {classClicked}
            {Object.entries(CLASS_LIST[classClicked]).map(([key, value]) => {
                 console.log(`here ${key} : ${value}`);
                 return (
                  <div key={key}>
                    <li>{key} : {value}</li>
                  </div>        
                 );
                 })}
          </div>)}
        </div>
        
      </section>
      
    </div>
  );
}

export default App;
