import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./index.css";
import Modal_Detail from './modal-detail';


const  App = () => {
  const [data_all, setData_all] = useState<any>([])
  const [search_text,setSearch_text] = useState<any>("")
  const [filters, setFilters] = useState([]);
  const[open, setOpen]=useState(false)
  const[data, setData]=useState<any>({})
  const [postsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

    const get_data =()=>{
      axios.get( "https://randomuser.me/api/?results=100").then((response) =>  {
        setData_all(response.data.results)
            })
    }
      const on_click_filter = () =>{
        try {
          const filters =  data_all.filter((v:any) => v.dob.age === parseInt(search_text))
          if (filters.length < 1 ||  data_all === 0 || data_all === '') {
          alert('ไม่มีข้อมูล กรุณาระบุข้อมูลใหม่อีกครั้ง')
          }
          setFilters(filters)
          setSearch_text("")
        } catch (error) {
          console.log('error :>> ', error);
        }
      }

      const on_click_modal = (e:any) =>{
        setData(e)
        setOpen(true)
      }

    const on_change = (e:any) =>{
    setSearch_text( e.target.value.toLowerCase())
    }

    let check_data
    if (filters.length < 1) {
      check_data = data_all
    }else{
      check_data = filters
    }
    // pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(check_data.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = check_data.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber:any) => setCurrentPage(pageNumber);
  
  useEffect(()=>{
    get_data()
  },[])

  return (
    <div className="App"  >
      <Modal_Detail open={open} setOpen={setOpen} data={data} />
       <nav className="navbar navbar-expand-lg navbar-primary bg-primary nav-h">
        <div>
          <h3 className='h3'>HTML CSS & JavaScript Test randomuser API</h3>
        </div>
      </nav>
      <div className="container mt-3" >
        <div className="card" style={{boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
          {/* <div className="card-header">
           
        </div> */}
        <div className="card-body ">
        <div className="row">
              <div style={{display:'flex', justifyContent:'end'}} >
                  <input type="text" onChange={on_change}  style={{width:'160px', marginRight:'10px'}}  className="form-control"  placeholder="กรุณาระบุ อายุ..."  />
                  <button type="button" className="btn btn-outline-success" onClick={on_click_filter}>ค้นหา</button>
               </div>
            </div>
          <div className="row mt-3" style={{display:'flex', justifyContent:'center', padding:'10px'}}>
              {currentPosts?.map((v:any, i:any)=>{
                return(
                  <div className="card" style={{width: "180px", padding:'10px', margin:'10px', boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}  key={i}>
                      <img src={v.picture.medium }  alt="-" onClick={()=>on_click_modal(v)} />
                   <div className="card-body">
                      <p className="card-text">อายุ: {v.dob.age}</p>
                  </div>
                </div>
                )
              })}
            </div>
            <nav>
              <ul className='pagination'>
                {pageNumbers.map(number => (
                  <li key={number} className='page-item'>
                    <a onClick={() => paginate(number)} href='!#' className='page-link'>
                      {number}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
     </div>
    </div>
  );
}
export default App;
