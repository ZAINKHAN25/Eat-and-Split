import { useState } from 'react';
import './App.css';

function App() {
  const friendsdata = [
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
  ];

  const [friendliststate, setfriendliststate] = useState(friendsdata);
  const [ismodaltrue, setismodaltrue] = useState(false);
  const [selectperson, setselectperson] = useState({});
  const [isaddfriendmodal, setisaddfriendmodal] = useState(false);
  const [newFriendData, setNewFriendData] = useState({
    frndname: '',
    imgurl: '',
    frndmoney: '',
    mymoney: '',
    gavemony: ''
  });
  const [billValue, setBillValue] = useState('');
  const [yourExpense, setYourExpense] = useState('');
  const [friendExpense, setFriendExpense] = useState('');

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
    setselectperson(newFriend);
    setNewFriendData({
      frndname: '',
      imgurl: '',
      frndmoney: '',
      mymoney: '',
      gavemony: ''
    });
    setisaddfriendmodal(false);
  }

  function handleSplitBill() {
    // Ensure the input fields are not empty and convert values to numbers
    if (billValue === '' || yourExpense === '' || friendExpense === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Calculate the new values for the selected person
    const updatedFriendlist = friendliststate.map((friend) => {
      if (friend === selectperson) {
        const newFriend = { ...friend };
        newFriend.frndmoney = parseFloat(billValue) - parseFloat(yourExpense);
        newFriend.mymoney = parseFloat(yourExpense) - parseFloat(friendExpense);
        return newFriend;
      }
      return friend;
    });

    // Update the friendliststate with the modified data
    setfriendliststate(updatedFriendlist);

    // Close the split bill form
    setismodaltrue(false);

    // Clear input fields
    setBillValue('');
    setYourExpense('');
    setFriendExpense('');
  }

  function singlepersonfoo(singleperson) {
    return (
      <div className='singleelement' key={singleperson.frndname}>
        <img src={singleperson.imgurl} alt="" />

        <div className='txtareaoflist'>
          <p className='frndname'>{singleperson.frndname}</p>
          <p>
            {singleperson.gavemony === "friend" ? (
              <span style={{ color: "red" }}> you owe {singleperson.frndname} {singleperson.mymoney} </span>
            ) : singleperson.gavemony === "me" ? (
              <span style={{ color: "green" }}> {singleperson.frndname} owes you {singleperson.frndmoney}  </span>
            ) : (
              <span> You and {singleperson.frndname} are even </span>
            )}
          </p>
        </div>
        <button
          onClick={() => {
            setselectperson(singleperson);
            setismodaltrue(true);
          }}
          className='frndlistbtn'
        >
          Select
        </button>
      </div>
    );
  }

  return (
    <div className="body">
      <div className='firstline'>
        <div className='friendlist'>
          {friendliststate.map((singleperson) => singlepersonfoo(singleperson))}
        </div>
        <div className='addfriendform'>{addFriend()}</div>
      </div>
      <div className='secondline'>
        {ismodaltrue === true ? (
          <div className='formofselect'>
            <div className='headingofselectform'>Split a bill with {selectperson.frndname}</div>
            <div className='inputofselestform'>
              <div>
                <p>Bill value</p> <input
                  placeholder={selectperson.frndmoney === 0 && selectperson.mymoney === 0 ? '1000' : selectperson.frndmoney + selectperson.mymoney}
                  type="number"
                  value={billValue}
                  onChange={(e) => setBillValue(e.target.value)}
                />
              </div>
              <div>
                <p>Your expense</p> <input
                  placeholder={selectperson.mymoney === 0 ? "450" : selectperson.mymoney}
                  type="number"
                  value={yourExpense}
                  onChange={(e) => setYourExpense(e.target.value)}
                />
              </div>
              <div>
                <p>{selectperson.frndname} expense</p> <input
                  placeholder={selectperson.frndmoney === 0 ? '550' : selectperson.frndmoney}
                  type="number"
                  value={friendExpense}
                  onChange={(e) => setFriendExpense(e.target.value)}
                />
              </div>
              <div>
                <p>Who is paying the bill</p> <select>
                  <option>You</option>
                  <option>{selectperson.frndname}</option>
                </select>
              </div>
            </div>
            <div onClick={handleSplitBill} className='splitbill'>
              Split bill
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default App;
