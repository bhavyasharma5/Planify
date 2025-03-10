import { useState, useRef, useEffect } from 'react'

const Planify = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentDate = new Date()

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [showEventPopup, setShowEventPopup] = useState(false)
  const [events, setEvents] = useState([])
  const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' })
  const [eventText, setEventText] = useState('')
  const [editingEvent, setEditingEvent] = useState(null)

  // References for the time picker scrollable containers
  const hoursRef = useRef(null)
  const minutesRef = useRef(null)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
  }

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
  }

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day)
    const today = new Date()

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate)
      setShowEventPopup(true)
      setEventTime({ hours: '00', minutes: '00' })
      setEventText('')
      setEditingEvent(null)
    }
  }

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
      text: eventText,
    }

    let updatedEvents = [...events]

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event,
      )
    } else {
      updatedEvents.push(newEvent)
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

    setEvents(updatedEvents)
    setEventTime({ hours: '00', minutes: '00' })
    setEventText('')
    setShowEventPopup(false)
    setEditingEvent(null)
  }

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date))
    setEventTime({
      hours: event.time.split(':')[0],
      minutes: event.time.split(':')[1],
    })
    setEventText(event.text)
    setEditingEvent(event)
    setShowEventPopup(true)
  }

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId)

    setEvents(updatedEvents)
  }

  // Generate hours options (00-23)
  const hoursOptions = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0')
  )

  // Generate minutes options (00-59)
  const minutesOptions = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  )

  // Handle time selection from the scrollable time picker
  const handleTimeSelection = (type, value) => {
    setEventTime(prev => ({
      ...prev,
      [type]: value
    }))
  }

  // Scroll to the current selected time when the time picker is shown
  useEffect(() => {
    if (showEventPopup && hoursRef.current && minutesRef.current) {
      const hourElement = hoursRef.current.querySelector(`[data-value="${eventTime.hours}"]`)
      const minuteElement = minutesRef.current.querySelector(`[data-value="${eventTime.minutes}"]`)
      
      if (hourElement) {
        hoursRef.current.scrollTop = hourElement.offsetTop - hoursRef.current.offsetHeight / 2 + hourElement.offsetHeight / 2
      }
      
      if (minuteElement) {
        minutesRef.current.scrollTop = minuteElement.offsetTop - minutesRef.current.offsetHeight / 2 + minuteElement.offsetHeight / 2
      }
    }
  }, [showEventPopup, eventTime.hours, eventTime.minutes])

  return (
    <div className="calendar-app">
      {showEventPopup && (
        <>
          <div className="event-popup-backdrop" onClick={() => setShowEventPopup(false)}></div>
          <div className="event-popup">
            <div className="time-input-container">
              <div className="event-popup-time">Time</div>
              <div className="modern-time-picker">
                <div className="time-column hours-column" ref={hoursRef}>
                  {hoursOptions.map(hour => (
                    <div 
                      key={hour} 
                      className={`time-option ${eventTime.hours === hour ? 'selected' : ''}`}
                      data-value={hour}
                      onClick={() => handleTimeSelection('hours', hour)}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
                <div className="time-separator">:</div>
                <div className="time-column minutes-column" ref={minutesRef}>
                  {minutesOptions.map(minute => (
                    <div 
                      key={minute} 
                      className={`time-option ${eventTime.minutes === minute ? 'selected' : ''}`}
                      data-value={minute}
                      onClick={() => handleTimeSelection('minutes', minute)}
                    >
                      {minute}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value)
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>
            <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        </>
      )}
      <div className="calendar">
        <h1 className="heading">Planify</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <span key={`empty-${i}`}></span>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const date = new Date(currentYear, currentMonth, day)
            const isCurrentDay = isSameDay(date, currentDate)

            return (
              <span
                key={day}
                className={isCurrentDay ? 'current-day' : ''}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </span>
            )
          })}
        </div>
      </div>
      <div className="events">
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
              <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Planify
