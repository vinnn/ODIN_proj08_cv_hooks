import '../styles/GeneralSection.css';
import React, { useState } from 'react';

export default function GeneralSection () {

  // ##########################################
  // HOOKS
  // ##########################################

  const [general, setGeneral] = useState({
          name: "",
          email: "",
          phone: "",
          editMode: false,
        });

  // a copy of the "general" state to use in onClickCancel        
  const [prevGeneral, setPrevGeneral] = useState(general);

  // ##########################################
  // FUNCTIONS (TO UPDATE THE STATE)
  // ##########################################

  // ------------------------------------------
  const onClickEdit = (e) => {
    console.log("clicked ediiit")

    setGeneral(
      {
        ...general,
        editMode: !general.editMode
        }
    )

    // make a copy of the state if needed for onClickCancel
    setPrevGeneral(general)
  }

  // ------------------------------------------  
  const onChangeEdit = (e) => {
    // name (in the state) of the property changed:
    const statePropName = e.target.attributes.name.value;
    
    // new value for the property changed:
    const newPropValue = e.target.value;

    // update the property in the state,
    // (... is spreading the existing state.general in the 
    // new state.general, except the changed property)
    setGeneral(
      {
        ...general,
        [statePropName]: newPropValue
      }
    );
  }

  // ------------------------------------------  
  const onClickSubmit = (e) => {
    setGeneral(
      {
        ...general,
        editMode: !general.editMode
        }
    )
  }

  // ------------------------------------------  
  const onClickCancel = (e) => {
    // set the state back to prevGeneral
    setGeneral(prevGeneral);
  }


  // ##########################################
  // THE RENDER FUNCTION
  // ##########################################
  const { name, email, phone, editMode } = general;
    return (
      <div className="div-general">

        <div>
            { editMode 
                ?   <GeneralEdit 
                        name={name} 
                        email={email} 
                        phone={phone} 
                        onChangeEdit={onChangeEdit} 
                        onClickCancel={onClickCancel}
                        onClickSubmit={onClickSubmit}>
                    </GeneralEdit>

                :   <GeneralDisplay 
                        name={name} 
                        email={email} 
                        phone={phone} 
                        onClickEdit={onClickEdit}>
                    </GeneralDisplay>
            }
        </div>

      </div>
    )
}


function GeneralDisplay ({name, email, phone, onClickEdit}){
    return (
      <div className="div-general-display">

            <div className="header-display">
                <div className="title">General</div>
                <button className="btn-edit" onClick={onClickEdit}>edit</button>
            </div>

            <div className="row">
                <div className="label">Name :</div>
                <div className="value">{name}</div>
            </div>
            <div className="row">
                <div className="label">Email :</div>
                <div className="value">{email}</div>
            </div>
            <div className="row">
                <div className="label">Phone :</div>
                <div className="value">{phone}</div>
            </div>

      </div>
    )
}


function GeneralEdit ({name, email, phone, onChangeEdit, onClickSubmit, onClickCancel }) {
    return (
      <div className="div-general-edit">

          <div className="header-edit">
              <div className="title">General</div>
              <button className="btn-cancel" onClick={onClickCancel}>cancel</button>
              <button className="btn-submit" onClick={onClickSubmit}>submit</button>
          </div>

          <div className="row">
              <div className="label">Name :</div>
              <input className="value" defaultValue={name} name="name" onChange={onChangeEdit}/>
          </div>
          <div className="row">
              <div className="label">Email :</div>
              <input className="value" defaultValue={email} name="email" onChange={onChangeEdit}/>
          </div>
          <div className="row">
              <div className="label">Phone :</div>
              <input className="value" defaultValue={phone} name="phone" onChange={onChangeEdit}/>
          </div>

      </div>
    )
}

