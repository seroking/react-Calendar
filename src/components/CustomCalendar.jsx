import moment from "moment";
import ReactModal from "react-modal";
import "./CustomCalendar.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignMentor} from "@/Store/groupeSlice";

const CustomCalendar = ({ groups, currentDate, onWeekChange }) => {



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const mentors = useSelector((state) => state.mentors);
  const dispatch = useDispatch();

  const handleModalOpen = ({group, day}) => {
    setModalData({group, day});
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const mentorId = Number(e.target.mentor.value);
    const day = modalData.day.format("YYYY-MM-DD");
    dispatch(assignMentor({groupId: modalData.group.id, mentorId, day}));
    handleModalClose();
  }

  const getMentorName = (group, day) => {
    const formattedDay = day.format("YYYY-MM-DD");
    const mentorId = group.mentors[formattedDay];
    const mentor = mentors.find(m => m.id === Number(mentorId));
    return mentor?.name;
  };


  const daysOfWeek = Array.from({ length: 6 }, (_, i) =>
    moment(currentDate).startOf("week").add(i + 1, "days")
  );

  return (
    <div className="calendar-container">
      {/* Navigation Controls */}
      <div className="calendar-controls">
        <button onClick={() => onWeekChange(-1)}>Previous Week</button>
        <span>{moment(currentDate).format("MMMM YYYY")}</span>
        <button onClick={() => onWeekChange(1)}>Next Week</button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Header Row */}
        <div className="calendar-header">
          <div className="header-cell">Groups</div>
          {daysOfWeek.map((day) => (
            <div key={day.format()} className="header-cell">
              {day.format("dddd")} <br /> {day.format("MMM D")}
            </div>
          ))}
        </div>

        {/* Group Rows */}
      {groups.map((group) => (
        <div key={group.id} className="calendar-row">
          <div className="group-name">{group.name}</div>
          {daysOfWeek.map((day) => {
            const formattedDay = day.format("YYYY-MM-DD");
            const hasMentor = group.mentors && group.mentors[formattedDay];
            
            return (
              <div 
                onClick={() => handleModalOpen({group, day})} 
                key={`${group.id}-${day.format()}`} 
                className="day-cell"
              >
                {hasMentor && (
                  <div className="event-card">
                    <strong>
                      {getMentorName(group, day) || "Unknown Mentor"}
                    </strong>
                      <div className="event-card-actions"></div>
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      </div>
      
      <ReactModal isOpen={isModalOpen} onRequestClose={handleModalClose} contentLabel="Add Data" className="modal-content" overlayClassName="modal-overlay" appElement={document.getElementById('root')}>
        
        {
          modalData && (
            <div>
              <h2>{modalData.group.name} - {modalData.day.format("dddd, MMMM D")}</h2>
              <button onClick={handleModalClose}>Close</button>

              <form onSubmit={handleSubmit}>
                <label htmlFor="mentor">
                  Mentor:
                  <select name="mentor">
                    {mentors.map((mentor) =>{
                      return <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                    })}
                  </select>
                </label>
                <button type="submit">Save</button>
              </form>
            </div>
          )
        }
        </ReactModal>
    </div>
  );
};

export default CustomCalendar;



// i should add the full data so the data reserved will stay in the date case and not in the day
// en gros la case reserver reste meme si on change de donnee , je dois etre plus specifique et mettre toute la date