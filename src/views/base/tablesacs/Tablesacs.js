import React,{ useState, useMemo,useEffect} from 'react'
import { CButton, CButtonGroup, CPagination } from '@coreui/react'
import { CPaginationItem } from '@coreui/react'
import { CModal } from '@coreui/react'
import { CModalHeader } from '@coreui/react'
import { CModalTitle } from '@coreui/react'
import { CModalBody } from '@coreui/react'
import { CModalFooter } from '@coreui/react'
import { Link } from "react-router-dom"
import axios from "axios"
import { CInputGroup } from '@coreui/react'
import { CInputGroupText } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import { CFormInput } from '@coreui/react'
import { CLink } from '@coreui/react'
import { CPopover} from '@coreui/react'
import { CTooltip } from '@coreui/react'
import FilterComponent from "./FilterComponent"

//@coreui/icons/svg/free/cil-album.svg

//import { makeStyles } from "@material-ui/core/styles"
//import Acstest from './Acstest'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'


const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
  
  
 

const Tablesacs = () => {

  //  const useStyles = makeStyles(styles);
  const [visibleLg, setVisibleLg] = useState(false);    
  const [visibleDel, setVisibleDel] = useState(false);    
  const [visibleAdd, setVisibleAdd] = useState(false);    
    const showUserApiUpd = "http://localhost:3000/user";    
    const [user, setUser] = useState([]);
    

    useEffect(() => {
        getUsers();
      }, []);
    
      const getUsers = () => {
        axios
          .get(showUserApiUpd)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      
      const [filterText, setFilterText] = React.useState("");
      const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
      );
    

      const filteredItems = user.filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );  


      const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
           setFilterText("");
          }
        };
    
        return (
          <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
         />
        );
      }, [filterText, resetPaginationToggle]);

     
      const [currentRec, setCurrentRec] = useState(1);   
      const [editedRec, seteditedRec] =useState(0);
      const [editedName, seteditedName] = useState('');
      const [editedEmail, seteditedEmail] = useState('');
      const [editedPhone, seteditedPhone] = useState('');

    const [currentPage,setcurrentPage] = useState(1) ;
    const [currentPageDel,setcurrentPageDel] = useState(0) ;

   const recordPerPage = 8;
   const lastIndex= recordPerPage * currentPage ;
   const firstIndex = lastIndex - recordPerPage ;
   const records = filteredItems.slice (firstIndex,lastIndex);
   const npage = Math.ceil (user.length/recordPerPage) ;
   const numbers = [...Array(npage + 1).keys()].slice(1);    
   const [recmail ,setRecemail] = useState("pons@gmail.com");
   const [newuser,setnewUser] = useState([]) ;
//   const [show, setShow] = useState(false);

const handelPreSubmitAdd = (e) => {
  console.log('testa');
  //e.preventDefault();
  setVisibleAdd(true);
}


const handelSubmitAdd = (e) => {
  e.preventDefault();

  const myidadd= document.getElementById('txtidadd').value ;
  const mynameadd = document.getElementById('txtnameadd').value ;
  const myemailadd = document.getElementById('txtemailadd').value ;
  const myphoneadd = document.getElementById('txtphoneadd').value ;  
  const baseurladd ="http://localhost:3000/user";  
  const newId = user.length + 1 ;

  let stateadd = {
    name : mynameadd,
    email : myemailadd,
    phone : myphoneadd,
    id : newId
}

  setVisibleAdd(false);

  fetch(baseurladd , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stateadd),
  })
    .then((response) => {
      if (!response.ok) {        
        console.log('error Acs');
        throw new Error("Network response was not ok");
      }      
      return response.json();
    })
    .then((data) => {            
      window.location.reload() ;
    })
    .catch((error) => {      
      //setError(error.message);
      console.log(error.message);
      //setIsLoading(false);
    })
};




const handelSubmit = (e) => {
  e.preventDefault();

  const myid= document.getElementById('txtid').value ;
  const myname = document.getElementById('txtname').value ;
  const myemail = document.getElementById('txtemail').value ;
  const myphone = document.getElementById('txtphone').value ;  
  const baseurl ="http://localhost:3000/user";
  

  let state = {
    name : myname,
    email : myemail,
    phone : myphone,
    id : myid
}
//console.log(state);
//console.log(JSON.stringify(state));      
//console.log(newuser) ;
//alert(newuser) ;
  //console.log( JSON.stringify(user) );

  setVisibleLg(false);

  fetch(baseurl.concat("/").concat(myid) , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  })
    .then((response) => {
      if (!response.ok) {
        //console.log(baseurl.concat("/").concat(myid)  );
        console.log('error Acs');
        throw new Error("Network response was not ok");
      }
      //console.log(JSON.stringify(state));
      return response.json();
    })
    .then((data) => {
      //setIsLoading(true);      
      //navigate("./#/base/tableacs");
      window.location.reload() ;
    })
    .catch((error) => {      
      //setError(error.message);
      console.log(error.message);
      //setIsLoading(false);
    })
};


const handelDelete = (e) => {
  //e.preventDefault();
  const myid= document.getElementById('txtiddel').value ;
  const myname = document.getElementById('txtnamedel').value ;
  const myemail = document.getElementById('txtemaildel').value ;
  const myphone = document.getElementById('txtphonedel').value ;  
  const baseurl ="http://localhost:3000/user";
  

  setVisibleDel(false);

  fetch(baseurl.concat("/").concat(myid) , {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if (!response.ok) {   
        console.log('error Acs');
        throw new Error("Network response was not ok");
      }      
      return response.json();
    })
    .then((data) => {            
      //setcurrentPageDel(currentPage) ;      
      window.location.reload() ;      
      //console.log(currentPage);
      //setcurrentPage(3);
      
    })
    .catch((error) => {            
      console.log(error.message);      
    })
};



const handelPreDelete = async (id) => {
  try {
   
    const response = await fetch(showUserApiUpd.concat("/") && id, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    seteditedRec(id) ;
    setVisibleDel(true);
    seteditedName(user[id-1].name);
    seteditedEmail(user[id-1].email);
    seteditedPhone(user[id-1].phone);
    
  } catch (error) {
    setError(error.message);
  } finally {
   // setIsLoading(false);
  }
};



const handelEdit = async (id) => {  
  //setIsLoading(true);
  try {
   
    const response = await fetch(showUserApiUpd.concat("/") && id, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    //setUser(user.filter((item) => item.id !== id));
    //setUser(()=> item.data);
    //const getUserxx = () => {
      //axios
        //.get(showUserApi.concat("/") && id)
        //.then((item) => {
          //setUser(item.data);
          //seteditedRec(id) ;
          //setVisibleLg(true);            
          //seteditedName('rondo1');    
        //})
        //.catch((err) => {
         // console.log(err);
        //});
    //};

    //setUser(records.filter((item) => item.id !== id));
    seteditedRec(id) ;
    setVisibleLg(true);
    seteditedName(user[id-1].name);
    seteditedEmail(user[id-1].email);
    seteditedPhone(user[id-1].phone);
    //alert(user[id-1].name) ;
    
    
  } catch (error) {
    setError(error.message);
  } finally {
   // setIsLoading(false);
  }
};


  return (

    
    <CRow>

<CModal id="mymodaladd"
      alignment="center"
      visible={visibleAdd}      
      aria-labelledby="TooltipsAndPopoverExample"
      onClose={()=>setVisibleAdd(false)}
    >
      <CModalHeader>
        <CModalTitle id="TooltipsAndPopoverExample">New User  </CModalTitle>
      </CModalHeader>
      <CModalBody>       
        <p>
        <CFormInput
    type="text"
    id="txtidadd"
    label="ID"
    placeholder=""
    defaultValue="0"
    text="Auto ID"
    readOnly="true"
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />

        <p>
        <CFormInput
    type="text"
    id="txtnameadd"
    label="Name"
    placeholder=""
    
    defaultValue=""    
    aria-describedby="exampleFormControlInputHelpInline"
  />    
    </p>
        <hr />

        <p>
        <CFormInput
    type="email"
    id="txtemailadd"
    label="Email"
    placeholder=""
    
    defaultValue=""    
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />
        <p>
        <CFormInput
    type="text"
    id="txtphoneadd"
    label="Phone No"
    placeholder=""
    
    defaultValue=""
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={ handelSubmitAdd}>Save</CButton>
      </CModalFooter>
    </CModal>


<CModal id="mymodaldel"
      alignment="center"
      visible={visibleDel}      
      aria-labelledby="TooltipsAndPopoverExample"
      onClose={()=>setVisibleDel(false)}
    >
      <CModalHeader>
        <CModalTitle id="TooltipsAndPopoverExample">Delete User Confirmation Window &nbsp; {editedRec}</CModalTitle>
      </CModalHeader>
      <CModalBody>       
        <p>
        <CFormInput
    type="text"
    id="txtiddel"
    label="ID"
    placeholder=""
    defaultValue={editedRec}
    text="Auto ID"
    readOnly="true"
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />

        <p>
        <CFormInput
    type="text"
    id="txtnamedel"
    label="Name"
    placeholder="User Name"
    text="User Name"
    defaultValue={editedName}
    readOnly="true"
    aria-describedby="exampleFormControlInputHelpInline"
  />    
    </p>
        <hr />

        <p>
        <CFormInput
    type="email"
    id="txtemaildel"
    label="Email"
    placeholder="User Email Address"
    text="System User Email"
    defaultValue={editedEmail}
    readOnly="true"
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />

        <p>
        <CFormInput
    type="text"
    id="txtphonedel"
    label="Phone No"
    placeholder="User Phone Number"
    text="System User Phone"
    defaultValue={editedPhone}
    readOnly="true"
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />



      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleDel(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={ handelDelete}>Delete</CButton>
      </CModalFooter>
    </CModal>




  
  <CModal id="mymodal"
      alignment="center"
      visible={visibleLg}      
      aria-labelledby="TooltipsAndPopoverExample"
      onClose={()=>setVisibleLg(false)}
    >
      <CModalHeader>
        <CModalTitle id="TooltipsAndPopoverExample">Editing User &nbsp; {editedRec}</CModalTitle>
      </CModalHeader>
      <CModalBody>       
        <p>
        <CFormInput
    type="text"
    id="txtid"
    label="ID"
    placeholder=""
    defaultValue={editedRec}
    text="Auto ID"
    readOnly="true"
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />

        <p>
        <CFormInput
    type="text"
    id="txtname"
    label="Name"
    placeholder="User Name"
    text="User Name"
    defaultValue={editedName}
    aria-describedby="exampleFormControlInputHelpInline"
  />    
    </p>
        <hr />

        <p>
        <CFormInput
    type="email"
    id="txtemail"
    label="Email"
    placeholder="User Email Address"
    text="System User Email"
    defaultValue={editedEmail}
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />

        <p>
        <CFormInput
    type="text"
    id="txtphone"
    label="Phone No"
    placeholder="User Phone Number"
    text="System User Phone"
    defaultValue={editedPhone}
    aria-describedby="exampleFormControlInputHelpInline"
  />        </p>
        <hr />



      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleLg(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={ handelSubmit}>Save changes</CButton>
      </CModalFooter>
    </CModal>


      <CCol xs={12}>
        <CCard className="mb-4" >
          <CCardHeader className="text-bg-success p-3 text-white"   >
             <strong>Users List </strong> 
          </CCardHeader>
          <CCardBody>            
              <CTable  >
                <CTableHead >
                  <CTableRow>
                    <CTableHeaderCell  scope="col" width="100px">ID</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="300px">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="300px">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="200px">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="100px">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                {records?.map((item, i) => {
return (                    <CTableRow key={i + 1} >     
                   <CTableHeaderCell scope="row" align='center'>{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.phone}</CTableDataCell>
                    
                      <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      onClick={()=>handelEdit(item.id)}
                      >
                      {'  Edit  '}
                      </CButton>
                    
                      <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      onClick={()=>handelPreDelete(item.id)}
                      >
                      {'delete '}
                      </CButton>


                    </CTableRow>
);
                })} 
                </CTableBody>
                
              </CTable>

          <CPagination>
           <CPaginationItem>
                  <button
                        className="btn btn-xs"
                        onClick={prePage}
                        disabled=""                        
                  > Prev </button>            

          {   
                numbers.map((n,i) => (
                <button classname={`page-item ${currentPage===n ? 'active' : '|'}`} key={i} >
                    <a onClick={ ()=> changeCPage(n)}>&nbsp; {n} &nbsp; </a>
                </button> 
                )
                )  
                }
       
               <button
                className="btn btn-xs"
                onClick={nextPage}
                disabled=""                        
                > Next </button>                  
                
                <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      onClick={()=> handelPreSubmitAdd()}
                      >
                      {'Add New'}
                      </CButton>
                  {subHeaderComponentMemo}
               </CPaginationItem>

             

           </CPagination>
         
           
            
          </CCardBody>
        </CCard>
      </CCol>
      
    </CRow>
  )


function prePage() {
    if (currentPage !== 1) {
      //currentPage==1 ;
      setcurrentPage(currentPage - 1)
    }

  }

  function changeCPage(id) {
    if (currentPage !== lastIndex) {
      setcurrentPage (id)
    }

  }

  function nextPage() {
    if (currentPage !== lastIndex) {
     // currentPage==1;
      setcurrentPage (currentPage + 1)
    }

  }


}
export default Tablesacs
