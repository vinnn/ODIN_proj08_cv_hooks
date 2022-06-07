import '../styles/ProfessionalSection.css';
import uniqid from 'uniqid';
import React, { useState } from 'react';


export default function ProfessionalSection() {
  
  // ##########################################
  // HOOKS
  // ##########################################
  // description of hooks:
  // -- itemList: array containing all the items
  // all operations are done on the itemList 
  // state (except during edit)
  // -- itemEdited: state for the item being
  // edited (if any). This is added to itemList
  // (on submit) or not added (if cancel)

  const [itemList, setItemList] = useState(
    []
  );

  const [itemEdited, setItemEdited] = useState(
    {
      company: "",
      title: "",
      role: "",
      dateFrom: "",
      dateTo: "",
      editMode: false,
      uid: uniqid()
    }
  );


  // ##########################################
  // FUNCTIONS - TO UPDATE THE STATES
  // ##########################################

  // ------------------------------------------  
  const onClickAdd = (e) => { 
    // turn all items to non-edited mode (only one item should be 
    // edited at a time)
    const itemListWithAllEditModeToFalse = itemList.map( itemi =>
      { return ({ ...itemi, editMode: false}) } 
    );

    // adds an item block with empty fields (in edit mode):
    const emptyItem = {
      company: "",
      title: "",
      role: "",
      dateFrom: "",
      dateTo: "",
      editMode: false,
      uid: uniqid()
    };

    // add the new empty item and update the itemList:
    const itemListUpdated = itemListWithAllEditModeToFalse.concat(emptyItem);
    setItemList( itemListUpdated );
  };

  // ------------------------------------------  
  const onClickEdit = (e) => {
    // id of the item selected:
    const itemUid = e.target.attributes.uid.value;
    // index of this item in itemList:
    let itemIndex = itemList.findIndex(itemi => {
      return itemi.uid === itemUid;
    });

    // update the itemEdited state:
    setItemEdited(itemList[itemIndex]);

    // switch all the editMode to false, except the item with itemUid
    const updatedItemList = itemList.map( (itemi) => 
        (itemi.uid === itemUid) ? 
            {
              ...itemi,
              editMode: true
            } 
        : 
            {
              ...itemi,
              editMode: false
            } 
    )
    // update itemList
    setItemList( updatedItemList );
  }

  // ------------------------------------------  
  const onChangeEdit = (e) => {
    // name of the property changed:
    const itemPropName = e.target.attributes.name.value;
    // new value for the property changed:
    const newPropValue = e.target.value;
    // update the itemEdited state:
    setItemEdited(
      {
        ...itemEdited,
        [itemPropName]: newPropValue
      }
    )
  }

  // ------------------------------------------  
  const onClickSubmit = (e) => {
    // id of the item selected:
    const itemUid = e.target.attributes.uid.value;
    // update itemList with the edited item:
    const updatedItemList = itemList.map( (itemi) => 
        (itemi.uid === itemUid) ? 
            itemEdited 
        : 
            {
              ...itemi
            } 
    )
    // update itemList:
    setItemList( updatedItemList );
  }

  // ------------------------------------------  
  const onClickCancel = (e) => {
    // turn all items to non-edited mode (only one item should be 
    // edited at a time):
    const itemListWithAllEditModeToFalse = itemList.map( itemi =>
      { return ({ ...itemi, editMode: false}) } 
    );
    // update itemList:
    setItemList( itemListWithAllEditModeToFalse );
  }

  // ------------------------------------------  
  const onClickDelete = (e) => {
    // id of the item selected:
    const itemUid = e.target.attributes.uid.value;
    // delete that item:
    setItemList(
      itemList.filter(itemi => itemi.uid !== itemUid)
    )
  }  


  // ##########################################
  // RENDERING
  // ##########################################
  const methods = {
      onClickEdit: onClickEdit, 
      onChangeEdit: onChangeEdit, 
      onClickSubmit: onClickSubmit, 
      onClickCancel: onClickCancel,
      onClickDelete: onClickDelete
  };

  return (
      <div className="div-professional">

        <div className="header-professional">
              <div className="title">Professional Experience</div>
              <button className="btn-add" onClick={onClickAdd}>add</button>
        </div>


        { itemList.map( (item) => { 

          return (
            <Item data={item} key={item.uid} methods={methods}></Item>
          )

        })}

      </div>
  )
}


export function Item ({ data, methods }) {
    // destructure:
    const { company, title, role, dateFrom, dateTo, editMode, uid } = data;
    const { onClickEdit, onChangeEdit, onClickSubmit, onClickCancel, onClickDelete } = methods;

    return (
      <div className="div-item">
        <div>
            { editMode 
                  ?   <ItemEdit 
                          company={company} 
                          title={title} 
                          role={role}
                          dateFrom={dateFrom}
                          dateTo={dateTo}
                          uid={uid}
                          onChangeEdit={onChangeEdit} 
                          onClickCancel={onClickCancel}
                          onClickSubmit={onClickSubmit}>
                      </ItemEdit>

                  :   <ItemDisplay 
                          company={company} 
                          title={title}
                          role={role}
                          dateFrom={dateFrom}
                          dateTo={dateTo} 
                          uid={uid}
                          onClickEdit={onClickEdit}
                          onClickDelete={onClickDelete}>
                      </ItemDisplay>
            }
        </div>
      </div>
    )
}


export function ItemDisplay({ company, title, role, dateFrom, dateTo, uid, onClickEdit, onClickDelete }) {
    return (
      <div className="div-item-display">

            <div className="header-display">
                <button className="btn-edit" uid={uid} onClick={onClickEdit}>edit</button>
                <button className="btn-edit" uid={uid} onClick={onClickDelete}>delete</button>
            </div>

            <div className="row">
                <div className="label">Company :</div>
                <div className="value">{company}</div>
            </div>
            <div className="row">
                <div className="label">Title :</div>
                <div className="value">{title}</div>
            </div>
            <div className="row">
                <div className="label">Role :</div>
                <div className="value">{role}</div>
            </div>
            <div className="row">
                <div className="label">From :</div>
                <div className="value">{dateFrom}</div>
            </div>
            <div className="row">
                <div className="label">To :</div>
                <div className="value">{dateTo}</div>
            </div>

      </div>
    )
}


export function ItemEdit ({ company, title, role, dateFrom, dateTo, uid, onChangeEdit, onClickSubmit, onClickCancel }) {
    return (
      <div className="div-item-edit">

            <div className="header-edit">
                <button className="btn-submit" uid={uid} onClick={onClickSubmit}>submit</button>            
                <button className="btn-cancel" uid={uid} onClick={onClickCancel}>cancel</button>
            </div>

            <div className="row">
                <div className="label">Company :</div>
                <input className="value" uid={uid} defaultValue={company} name="company" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">Title :</div>
                <input className="value" uid={uid} defaultValue={title} name="title" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">Role :</div>
                <input className="value" uid={uid} defaultValue={role} name="role" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">From :</div>
                <input className="value" uid={uid} defaultValue={dateFrom} name="dateFrom" onChange={onChangeEdit}/>
            </div>
            <div className="row">
                <div className="label">To :</div>
                <input className="value" uid={uid} defaultValue={dateTo} name="dateTo" onChange={onChangeEdit}/>
            </div>

      </div>
    )
}