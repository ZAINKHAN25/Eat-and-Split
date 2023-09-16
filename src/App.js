import { useState } from 'react';
import './App.css';

function App() {

  let [friendliststate, setfriendliststate] = useState([
    {
      frndname: "Zain",
      imgurl: "https://avatars.githubusercontent.com/u/121414309?v=4",
      frndmoney: 500,
      mymoney: 100,
      gavemony: 'friend'
    },
    {
      frndname: "Huzaifa",
      imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPyc3RwCMpe0L0fvlBHyYdlAutecKE6wIv9ZWKmDPd&s",
      frndmoney: 200,
      mymoney: 300,
      gavemony: 'me'
    },
    {
      frndname: "Usama",
      imgurl: "https://thrivedx.com/wp-content/uploads/2022/11/Featured-Images-News-24-1024x1024.png",
      frndmoney: 400,
      mymoney: 300,
      gavemony: ''
    }
  ]);

  let [ismodaltrue, setismodaltrue] = useState(false);
  let [selectperson, setselectperson] = useState({ person: null, index: null });
  let [isaddfriendmodal, setisaddfriendmodal] = useState(false);
  let [newFriendData, setNewFriendData] = useState({
    frndname: '',
    imgurl: '',
    frndmoney: '',
    mymoney: '',
    gavemony: ''
  });

  let [yourExpense, setYourExpense] = useState('');
  let [friendExpense, setFriendExpense] = useState('');
  let [gaveMony, setgaveMoney] = useState('');

  function addFriend() {
    if (!isaddfriendmodal) {
      return (
        <button onClick={() => setisaddfriendmodal(true)} className='addfriendbtn'>
          Add Friend
        </button>
      );
    } else {
      return (
        <>
          <div className='backgroundcolorprevious'>
            <div>
              <p>Friend Name</p>
              <input
                placeholder='Your Friend Name'
                type="text"
                value={newFriendData.frndname}
                onChange={(e) => setNewFriendData({ ...newFriendData, frndname: e.target.value })}
              />
            </div>
            <div>
              <p>Image URL:</p>
              <input
                placeholder='https://avatars.githubusercontent.com/u/121414309?v=4'
                type="url"
                value={newFriendData.imgurl}
                onChange={(e) => setNewFriendData({ ...newFriendData, imgurl: e.target.value })}
              />
            </div>
            <span>
              <button onClick={handleAddFriend}>Add</button>
            </span>
          </div>
          <button className='addfriendbtn' onClick={() => setisaddfriendmodal(false)}>
            Close
          </button>
        </>
      );
    }
  }

  function handleAddFriend() {
    const newFriend = {
      frndname: newFriendData.frndname,
      imgurl: newFriendData.imgurl,
      frndmoney: '',
      mymoney: '',
      gavemony: ''
    };

    setfriendliststate([...friendliststate, newFriend]);
    setselectperson({ person: newFriend, index: friendliststate.length });
    setNewFriendData({
      frndname: '',
      imgurl: '',
      frndmoney: '',
      mymoney: '',
      gavemony: ''
    });
    setisaddfriendmodal(false);
  }

  function singlepersonfoo(singleperson, i) {

    return (
      <div className='singleelement' key={singleperson.frndname}>
        <img src={singleperson.imgurl} alt="" />

        <div className='txtareaoflist'>
          <p className='frndname'>{singleperson.frndname}</p>
          <p>
            {singleperson.gavemony == "friend" ? (
              <span style={{ color: "red" }}> you owes {singleperson.frndname} {singleperson.mymoney} </span>
            ) : singleperson.gavemony == "me" ? (
              <span style={{ color: "green" }}> {singleperson.frndname} owes you {singleperson.frndmoney}  </span>
            ) : (
              <span> You and {singleperson.frndname} are even </span>
            )}
          </p>
        </div>
        <button
          onClick={() => {
            setselectperson({ person: singleperson, index: i });
            setismodaltrue(true);
          }}
          className='frndlistbtn'
        >
          Select
        </button>
      </div>
    );
  }

  function splitbillfoo(person, index) {
    const { frndname: friendname, imgurl: imageurl } = person;
    const cloneoffrienddata = [...friendliststate];
    const currentobject = {
      frndname: friendname,
      imgurl: imageurl,
      frndmoney: friendExpense,
      mymoney: yourExpense,
      gavemony: gaveMony == "" ? "me" :  gaveMony,
    };
  
    cloneoffrienddata.splice(index, 1, currentobject);
    setfriendliststate(cloneoffrienddata);

    setismodaltrue(false)
  }

  return (
    <div className="body">
      <div className='firstline'>
        <div className='friendlist'>
          {friendliststate.map((singleperson, i) => singlepersonfoo(singleperson, i))}
        </div>
        <div className='addfriendform'>{addFriend()}</div>
      </div>
      <div className='secondline'>
        {ismodaltrue === true ? (
          <div className='formofselect'>
            <div className='headingofselectform'>Split a bill with {selectperson.person.frndname}</div>
            <div className='inputofselestform'>
              <div>
                <p>Your expense</p> <input
                  placeholder={selectperson.person.mymoney == 0 ? "450" : selectperson.person.mymoney}
                  type="number"
                  value={yourExpense}
                  onChange={(e) => setYourExpense(e.target.value)}
                />
              </div>
              <div>
                <p>{selectperson.person.frndname} expense</p> <input
                  placeholder={selectperson.person.frndmoney == 0 ? '550' : selectperson.person.frndmoney}
                  type="number"
                  value={friendExpense}
                  onChange={(e) => setFriendExpense(e.target.value)}
                />
              </div>
              <div>
                <p>Who is paying the bill</p> <select onClick={(e) => {
                  console.log(e.target.value)
                  setgaveMoney(e.target.value)}}>
                  <option value="me">You</option>
                  <option value="friend">{selectperson.person.frndname}</option>
                </select>
              </div>
            </div>
            <div onClick={() => splitbillfoo(selectperson.person, selectperson.index)} className='splitbill'>
              Split bill
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default App;
