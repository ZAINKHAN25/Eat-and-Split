import { useState } from 'react';
import './App.css';

function App() {

  const friendsdata = [{
    frndname: "Zain",
    imgurl: "https://avatars.githubusercontent.com/u/121414309?v=4",
    frndmoney: 500,
    mymoney: 100,
    gavemony: 'friend'
  }, {
    frndname: "Huzaifa",
    imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPyc3RwCMpe0L0fvlBHyYdlAutecKE6wIv9ZWKmDPd&s",
    frndmoney: 200,
    mymoney: 300,
    gavemony: 'me'
  }, {
    frndname: "Usama",
    imgurl: "https://thrivedx.com/wp-content/uploads/2022/11/Featured-Images-News-24-1024x1024.png",
    frndmoney: 400,
    mymoney: 300,
    gavemony: ''
  }];

  // let's area 
  let [friendliststate, setfriendliststate] = useState(friendsdata)
  let [ismodaltrue, setismodaltrue] = useState(false)
  let [selectperson, setselectperson] = useState({});
  let [isaddfriendmodal, setisaddfriendmodal] = useState(false);

  // functions area

  function addfriend(){
    return (
    isaddfriendmodal == false ? (<button onClick={()=> setisaddfriendmodal(true)} className='addfriendbtn'>Add Friend</button>) : (
      <>
        <div className='backgroundcolorprevious'>
          <div>
            <p>Friend Name</p>  
            <input placeholder='Your Friend Name' type="text" />
          </div>
          <div>
          <p>Image url :</p>  
            <input placeholder='https://avatars.githubusercontent.com/u/121414309?v=4' type="url" />
          </div>
          <span>
            <button>Add</button>
          </span>
        </div>
        <button className='addfriendbtn' onClick={()=> setisaddfriendmodal(false)}>Close</button>
      </>
    )
    )
    
  }

  function singlepersonfoo(singleperson) {
    return (
      <div className='singleelement'>
        <img src={singleperson.imgurl} alt="" />

        <div className='txtareaoflist'>
          <p className='frndname'>{singleperson.frndname}</p>
          <p>
            {/* if ap maqroz ho to ye chale ga warna phir green tab aiga k app ka dost maqrooz hai warna phir sab log barabar hai */}
            {singleperson.gavemony == "friend" ? (<span style={{ color: "red" }}> you owe {singleperson.frndname} {singleperson.mymoney} </span>) : singleperson.gavemony == "me" ? (<span style={{ color: "green" }}> {singleperson.frndname} owes you {singleperson.frndmoney}  </span>) : (<span> You and {singleperson.frndname} are even </span>)
            }
          </p>
        </div>
        <button onClick={() => {
          setselectperson(singleperson);
          setismodaltrue(true)
          }} className='frndlistbtn'>Select</button>
      </div>
    )
  }



  // return area
  return (
    <div className="body">
      <div className='firstline'>

        <div className='friendlist'>

          {friendliststate.map(singleperson => singlepersonfoo(singleperson))}

        </div>
        <div className='addfriendform'>
            {addfriend()}
        </div>

      </div>
      <div className='secondline'>
        {/* ye edit wala form hai */}
        {ismodaltrue == true ? (
          <div className='formofselect'>
            <div className='headingofselectform'>Split a bill with {selectperson.frndname}</div>
            <div className='inputofselestform'>

              <div>
                <p>Bill value</p> <input placeholder={selectperson.frndmoney == 0 && selectperson.mymoney == 0 ? '1000' : (selectperson.frndmoney + selectperson.mymoney)} type="number" />
              </div>
              <div>
                <p>Your expense</p> <input placeholder={selectperson.mymoney == 0 ? "450" : selectperson.mymoney } type="number" />
              </div>
              <div>
                <p>{selectperson.frndname} expense</p> <input placeholder={selectperson.frndmoney == 0 ? '550' : selectperson.frndmoney} type="number" />
              </div>
              <div>
                <p>Who is paying bill</p> <select>
                  <option>You</option>
                  <option>{selectperson.frndname}</option>
                </select>
              </div>

            </div>
            <div onClick={()=> setismodaltrue(false)} className='splitbill'>Split bill</div>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default App;
