import '../styles/AcademicSection.css';
import uniqid from 'uniqid';
import React, { useState } from 'react';


export default function AcademicSection() {

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
      school: "",
      title: "",
      year: "",
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
      school: "", 
      title: "", 
      year: "", 
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
      <div className="div-academic">

          <div className="header-academic">
                <div className="title">Academic Background</div>
                <button className="btn-add" onClick={onClickAdd}>add</button>
          </div>

          { itemList.map( (itemi) => { 
            return (
              <Item data={itemi} key={itemi.uid} methods={methods}></Item>
            )

          })}

      </div>
  )
}


export function Item ({ data, methods }) {
    // destructure:
    const { school, title, year, editMode, uid } = data;
    const { onClickEdit, onChangeEdit, onClickSubmit, onClickCancel, onClickDelete } = methods;

    return (
      <div className="div-item">
        <div>
            { editMode 
                ?   <ItemEdit 
                        school={school} 
                        title={title} 
                        year={year}
                        uid={uid}
                        onChangeEdit={onChangeEdit} 
                        onClickCancel={onClickCancel}
                        onClickSubmit={onClickSubmit}>
                    </ItemEdit>

                :   <ItemDisplay 
                        school={school} 
                        title={title} 
                        year={year} 
                        uid={uid}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}>
                    </ItemDisplay>
            }
        </div>
      </div>
    )
}


export function ItemDisplay({ school, title, year, uid, onClickEdit, onClickDelete }) {
    return (
      <div className="div-item-display">

            <div className="header-display">
                <button className="btn-edit" uid={uid} onClick={onClickEdit}>edit</button>
                <button className="btn-edit" uid={uid} onClick={onClickDelete}>delete</button>
            </div>

            <div className="row">
                <div className="label">School :</div>
                <div className="value">{school}</div>
            </div>
            <div className="row">
                <div className="label">Title :</div>
                <div className="value">{title}</div>
            </div>
            <div className="row">
                <div className="label">Year :</div>
                <div className="value">{year}</div>
            </div>

      </div>
    )
}


export function ItemEdit ({ school, title, year, uid, onChangeEdit, onClickSubmit, onClickCancel }) {
    return (
      <div className="div-item-edit">

          <div className="header-edit">
              <button className="btn-submit" uid={uid} onClick={onClickSubmit}>submit</button>            
              <button className="btn-cancel" uid={uid} onClick={onClickCancel}>cancel</button>
          </div>

          <div className="row">
              <div className="label">School :</div>
              <input className="value" uid={uid} defaultValue={school} name="school" onChange={onChangeEdit}/>
          </div>
          <div className="row">
              <div className="label">Title :</div>
              <input className="value" uid={uid} defaultValue={title} name="title" onChange={onChangeEdit}/>
          </div>
          <div className="row">
              <div className="label">Year :</div>
              <input className="value" uid={uid} defaultValue={year} name="year" onChange={onChangeEdit}/>
          </div>

      </div>
    )
}