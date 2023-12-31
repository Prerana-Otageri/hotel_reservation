import React from 'react';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"


const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false)

    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,

    });
    
    const handleOptions = (name, operator) =>{
        setOptions( (prev) => {
            return {
                ...prev, 
                [name] : operator =="i" ? options[name] +1 : options[name] -1,
            };
        });
    };

  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
      <div className="headerList">
        <div className="headerListItem active">
        <FontAwesomeIcon icon={faBed} />
        <span> Stays</span>
        </div>
        <div className="headerListItem">
        <FontAwesomeIcon icon={faPlane} />
        <span> Flights</span>
        </div><div className="headerListItem">
        <FontAwesomeIcon icon={faCar} />
        <span> Car rentals</span>
        </div><div className="headerListItem">
        <FontAwesomeIcon icon={faBed} />
        <span> Attractions</span>
        </div>  
        <div className="headerListItem">
        <FontAwesomeIcon icon={faTaxi} />
        <span> Airport Taxis</span>
        </div>
</div>
        
    { type !== "list" && (
        <>
        <h1 className='headerTitle'>A lifetime of discounts? Crazy</h1>
        <p className="headerDesc">
            Discover your dream destination and everything you need to have a smooth stay!
             </p>
        <button className="headerBtn">Sign in /  Register</button>
        <div className="headerSearch">
            <div className="headerSearchItem">
        <FontAwesomeIcon icon={faBed} className='headerIcon' />
        <input type="text" 
        placeholder='Where are you going?'
        className='headerSearchInput' />
        </div>

        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
        <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'> {format(date[0].startDate, "dd/MM/yyyy")} to {format(date[0].startDate, "dd/MM/yyyy")} </span>
        { openDate && <DateRange
  editableDateInputs={true}
  onChange={item => setDate([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={date}
  className='date'
/>}
        </div> <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
        <span onClick = {() => setOpenOptions(!openOptions)} className='headerSearchText'> {`${options.adult}adult | ${options.children}children | ${options.room} room`}</span>
       {openOptions&& <div className="options">
          <div className="optionItem">
            <span className="optionText">Adult</span>
            <div className="optionCounter">
                <button
                disabled={options.adult <=1}
                className="optionCounterBtn" onClick={()=>handleOptions("adult", "d")}>-</button>
            <span className="optionCounterNumber">{options.adult    }</span>
            <button className="optionCounterBtn" onClick={()=>handleOptions("adult", "i")}>+</button></div>
                </div>  
                <div className="optionItem">
            <span className="optionText">Children</span>
            <div className="optionCounter">
                <button disabled={options.children<=0}
                className="optionCounterBtn" onClick={()=>handleOptions("children", "d")}>-</button>
            <span className="optionCounterNumber">{options.children}</span>
            <button className="optionCounterBtn" onClick={()=>handleOptions("children", "i")}>+</button></div>
                </div>   
                <div className="optionItem">
            <span className="optionText">Room</span>
            <div className="optionCounter">
                <button
                disabled = {options.room <=1}
                className="optionCounterBtn" onClick={()=>handleOptions("room", "d")}>-</button>
            <span className="optionCounterNumber">{options.room}   </span>
            <button className="optionCounterBtn" onClick={()=>handleOptions("room", "i")}>+</button></div>
                </div>   
        </div>}
        </div>
        <div className="headerSearchItem">
            <button className="headerBtn">Search</button>
        </div>
        </div> </>)}
      </div>

    </div>
    
  )
}

export default Header
