import { useState } from 'react';
import './App.css';
import { Pets ,NavBar ,Footer, AddPet, PetDetail } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
 
 
function App({user,signOut}) {
  const [showForm,setShowForm] = useState(false);
  const [showDetail,setShowDetail] = useState(false);
  const [pet,setPet] = useState();
  const [updatePet,setUpdatePet] = useState();

  const [name,setName] = useState("");
  const [age,setAge] = useState("");
  const [breed,setBreed] = useState("");
  const [about,setAbout] = useState("");
  const [color,setColor] = useState("");
  const [image,setImage] = useState("");

  const navbarOvverrides = {
    Button:{
      onClick:signOut,
    },
    "Add Pet":{
        style: {
           cursor: "pointer" ,
        },
        onClick: ()=>{
          setShowForm(!showForm)
        },
    },
  }
  const fromOverride = {
    TextField29766922:{
      placeholder:name,
    },
    TextField29766923:{
      placeholder:age,
    },
    TextField29766924:{
      placeholder:breed,
    },
    TextField40652695:{
      placeholder:about,
    },
    TextField40652702:{
      placeholder:color,
    },
    TextField40652709:{
      placeholder:image,
    },
    image:{
      src:updatePet==null?"https://img.freepik.com/premium-photo/golden-retriever-lying-panting-isolated-white_191971-16974.jpg":updatePet.image,
    },
    Button40672741:{ // Save Button
      isDisabled:updatePet?true:false,
    },
    Button40672745:{ // Update Button
      isDisabled:!updatePet?true:false,
    },
    Icon: {
      style: {
        cursor: "pointer" ,
      },
      
      onClick:()=>{
        setShowForm(false);
      },
    },
  };
  const dtlOverride = {
    Close: {
      style: {
        cursor: "pointer" ,
      },
      onClick:()=>{
        setShowDetail(false)
      },
    },
  };
  return (
    <div className="App">
      <header className="App-header">
        <NavBar width={"100%"} overrides={navbarOvverrides}/>
        { showDetail&&(
          <PetDetail overrides={dtlOverride} pet={pet}/>
        )}
        
        { showForm&&(
            <AddPet 
              prop={updatePet}
              overrides={fromOverride}
              style={{
              textAlign:"left",
              margin:"1rem"
            }} />
        )}
        <Pets itemsPerPage={3} overrideItems={({item,index})=>({
          overrides:{
            Breed:{color:"blue"},
            Button40542697:{
              onClick:()=> {
                setShowDetail(!showDetail);
                setPet(item);setUpdatePet(null);
              }
            },
            Button40522688:{
              onClick:()=> {
                if(!showForm)setShowForm(true);
                  setName(item.name);
                  setBreed(item.breed);
                  setAge(item.age);                
                  setAbout(item.about);
                  setImage(item.image);
                  setColor(item.color);
                  setUpdatePet(item);
              }
            },
          }
        })}/>
        <Footer/>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
