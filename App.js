import React, { useState, useEffect } from 'react';
import { Calendar, List, Plus, Search, Clock, MapPin, X, ChevronLeft, ChevronRight, Star, Zap, Trophy } from 'lucide-react';

const EventManagementApp = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchDate, setSearchDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: ''
  });

  // Initialize with comprehensive sample events for all 12 months
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    
    const generateWeeklyEvents = (startDate, title, description, weeksCount = 52) => {
      const events = [];
      const date = new Date(startDate);
      
      for (let i = 0; i < weeksCount; i++) {
        events.push({
          id: Date.now() + i + 1000,
          title: title,
          date: date.toISOString().split('T')[0],
          description: description,
          category: 'tech'
        });
        date.setDate(date.getDate() + 7);
      }
      return events;
    };

    const sampleEvents = [
      // January 2025
      { id: 1, title: 'New Year Celebration', date: '2025-01-01', description: 'College New Year party and celebrations', category: 'celebration' },
      { id: 2, title: 'Spring Semester Begins', date: '2025-01-15', description: 'First day of spring semester classes', category: 'academic' },
      { id: 3, title: 'Computer Science Orientation', date: '2025-01-20', description: 'Orientation for new CS students', category: 'academic' },
      { id: 4, title: 'Research Paper Submission', date: '2025-01-30', description: 'Final deadline for research proposals', category: 'deadline' },

      // February 2025
      { id: 5, title: 'Valentine\'s Day Event', date: '2025-02-14', description: 'College Valentine\'s Day celebration', category: 'celebration' },
      { id: 6, title: 'Mid-term Exams Begin', date: '2025-02-17', description: 'First semester mid-term examinations', category: 'exam' },
      { id: 7, title: 'Science Fair', date: '2025-02-25', description: 'Annual college science exhibition', category: 'competition' },
      { id: 8, title: 'Programming Contest', date: '2025-02-28', description: 'Inter-college coding competition', category: 'tech' },

      // March 2025
      { id: 9, title: 'Holi Festival', date: '2025-03-14', description: 'Traditional Holi celebration at campus', category: 'celebration' },
      { id: 10, title: 'Career Fair', date: '2025-03-20', description: 'Annual career guidance and job fair', category: 'career' },
      { id: 11, title: 'Spring Break', date: '2025-03-25', description: 'Spring break vacation begins', category: 'break' },
      { id: 12, title: 'Project Presentations', date: '2025-03-31', description: 'Final project presentations for seniors', category: 'academic' },

      // April 2025
      { id: 13, title: 'Annual Sports Meet', date: '2025-04-05', description: 'Inter-college sports competition', category: 'sports' },
      { id: 14, title: 'Earth Day Activities', date: '2025-04-22', description: 'Environmental awareness programs', category: 'social' },
      { id: 15, title: 'Mock Interviews', date: '2025-04-28', description: 'Practice interviews for final year students', category: 'career' },
      { id: 16, title: 'Lab Practical Exams', date: '2025-04-30', description: 'Laboratory practical examinations', category: 'exam' },

      // May 2025
      { id: 17, title: 'Final Exams Begin', date: '2025-05-05', description: 'Final semester examinations start', category: 'exam' },
      { id: 18, title: 'Graduation Ceremony', date: '2025-05-20', description: 'Annual graduation and convocation', category: 'celebration' },
      { id: 19, title: 'Summer Internship Fair', date: '2025-05-25', description: 'Summer internship opportunities', category: 'career' },
      { id: 20, title: 'Alumni Meet', date: '2025-05-30', description: 'Annual alumni gathering and networking', category: 'social' },

      // June 2025
      { id: 21, title: 'Summer Classes Begin', date: '2025-06-02', description: 'Summer semester courses start', category: 'academic' },
      { id: 22, title: 'Yoga Day Celebration', date: '2025-06-21', description: 'International Yoga Day activities', category: 'wellness' },
      { id: 23, title: 'Monsoon Preparation', date: '2025-06-25', description: 'Campus monsoon readiness activities', category: 'social' },
      { id: 24, title: 'Research Workshop', date: '2025-06-28', description: 'Research methodology workshop for students', category: 'academic' },

      // July 2025
      { id: 25, title: 'Independence Prep', date: '2025-07-15', description: 'Preparation for Independence Day celebrations', category: 'celebration' },
      { id: 26, title: 'Tech Symposium', date: '2025-07-20', description: 'Annual technology symposium and expo', category: 'tech' },
      { id: 27, title: 'Monsoon Sports', date: '2025-07-25', description: 'Indoor sports tournament during monsoon', category: 'sports' },
      { id: 28, title: 'Guest Lecture Series', date: '2025-07-30', description: 'Industry expert guest lectures', category: 'academic' },

      // August 2025 - Elbert Hackathon and other events
      { id: 29, title: 'Independence Day', date: '2025-08-15', description: 'Independence Day celebration and flag hoisting', category: 'celebration' },
      { id: 30, title: 'Elbert Hackathon Day 1', date: '2025-08-18', description: '24-hour coding hackathon begins - Day 1', category: 'hackathon' },
      { id: 31, title: 'Elbert Hackathon Day 2', date: '2025-08-19', description: '24-hour coding hackathon continues - Day 2', category: 'hackathon' },
      { id: 32, title: 'Elbert Hackathon Day 3', date: '2025-08-20', description: '24-hour coding hackathon continues - Day 3', category: 'hackathon' },
      
      { id: 33, title: 'Raksha Bandhan', date: '2025-08-09', description: 'Raksha Bandhan celebration at campus', category: 'celebration' },
      { id: 34, title: 'Semester Registration', date: '2025-08-25', description: 'Fall semester course registration', category: 'deadline' },

      // September 2025
      { id: 35, title: 'Teachers\' Day', date: '2025-09-05', description: 'Teachers\' Day celebration and appreciation', category: 'celebration' },
      { id: 36, title: 'Fall Semester Begins', date: '2025-09-10', description: 'New academic semester starts', category: 'academic' },
      { id: 37, title: 'Ganesh Chaturthi', date: '2025-08-27', description: 'Ganesh Chaturthi festival celebration', category: 'celebration' },
      { id: 38, title: 'Freshers\' Orientation', date: '2025-09-15', description: 'Orientation program for new students', category: 'academic' },
      { id: 39, title: 'Club Fair', date: '2025-09-25', description: 'Student clubs and societies fair', category: 'social' },

      // October 2025
      { id: 40, title: 'Dussehra Celebration', date: '2025-10-02', description: 'Traditional Dussehra festival celebration', category: 'celebration' },
      { id: 41, title: 'Hackathon Prep Workshop', date: '2025-10-10', description: 'Preparation workshop for upcoming hackathons', category: 'tech' },
      { id: 42, title: 'Diwali Festival', date: '2025-10-20', description: 'Diwali celebration with lights and festivities', category: 'celebration' },
      { id: 43, title: 'Mid-term Exams', date: '2025-10-28', description: 'Fall semester mid-term examinations', category: 'exam' },

      // November 2025
      { id: 44, title: 'Cultural Fest Begins', date: '2025-11-05', description: 'Annual cultural festival kicks off', category: 'celebration' },
      { id: 45, title: 'Bhai Dooj', date: '2025-11-03', description: 'Bhai Dooj festival celebration', category: 'celebration' },
      { id: 46, title: 'Inter-College Debate', date: '2025-11-15', description: 'Inter-college debate competition', category: 'competition' },
      { id: 47, title: 'Winter Prep Activities', date: '2025-11-25', description: 'Preparation for winter season activities', category: 'social' },
      { id: 48, title: 'Thanksgiving Potluck', date: '2025-11-28', description: 'Community thanksgiving dinner', category: 'social' },

      // December 2025
      { id: 49, title: 'Winter Festival', date: '2025-12-05', description: 'Winter season celebration and activities', category: 'celebration' },
      { id: 50, title: 'Final Project Demos', date: '2025-12-15', description: 'Final year project demonstrations', category: 'academic' },
      { id: 51, title: 'Christmas Celebration', date: '2025-12-25', description: 'Christmas party and gift exchange', category: 'celebration' },
      { id: 52, title: 'Year End Party', date: '2025-12-31', description: 'New Year\'s Eve celebration and party', category: 'celebration' }
    ];

    // Add weekly Elbert Hackathon events (every Monday starting from Aug 25)
    const weeklyHackathonEvents = generateWeeklyEvents('2025-08-25', 'Weekly Elbert Meetup', 'Weekly coding meetup and skill sharing session', 20);
    
    const allEvents = [...sampleEvents, ...weeklyHackathonEvents];
    
    setEvents(allEvents);
    setFilteredEvents(allEvents);
  }, []);

  // Filter events based on search date
  useEffect(() => {
    if (searchDate) {
      const filtered = events.filter(event => event.date === searchDate);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [events, searchDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEvent = () => {
    if (formData.title && formData.date) {
      const newEvent = {
        id: Date.now(),
        ...formData,
        category: 'custom'
      };
      setEvents(prev => [...prev, newEvent]);
      setFormData({ title: '', date: '', description: '' });
      setShowAddForm(false);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const isToday = (date) => {
    const today = new Date().toISOString().split('T')[0];
    return date === today;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getCategoryColor = (category) => {
    const colors = {
      'academic': 'linear-gradient(135deg, #3b82f6, #2563eb)',
      'exam': 'linear-gradient(135deg, #ef4444, #dc2626)',
      'celebration': 'linear-gradient(135deg, #ec4899, #9333ea)',
      'tech': 'linear-gradient(135deg, #10b981, #059669)',
      'hackathon': 'linear-gradient(135deg, #f59e0b, #f97316)',
      'sports': 'linear-gradient(135deg, #f97316, #ef4444)',
      'career': 'linear-gradient(135deg, #6366f1, #9333ea)',
      'deadline': 'linear-gradient(135deg, #dc2626, #ec4899)',
      'social': 'linear-gradient(135deg, #14b8a6, #06b6d4)',
      'wellness': 'linear-gradient(135deg, #84cc16, #14b8a6)',
      'break': 'linear-gradient(135deg, #60a5fa, #6366f1)',
      'competition': 'linear-gradient(135deg, #a855f7, #ec4899)',
      'custom': 'linear-gradient(135deg, #6b7280, #4b5563)'
    };
    return colors[category] || colors['custom'];
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'hackathon': <Trophy style={{ width: '16px', height: '16px' }} />,
      'tech': <Zap style={{ width: '16px', height: '16px' }} />,
      'celebration': <Star style={{ width: '16px', height: '16px' }} />,
      'exam': <Clock style={{ width: '16px', height: '16px' }} />,
      'deadline': <Clock style={{ width: '16px', height: '16px' }} />
    };
    return icons[category] || null;
  };

  const renderCalendarView = () => {
    const today = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          style={{
            height: '112px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)'
          }}
        ></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = filteredEvents.filter(event => event.date === dateStr);
      const isCurrentDay = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const isTodayDate = dateStr === today.toISOString().split('T')[0];

      days.push(
        <div 
          key={day} 
          style={{
            height: '112px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            background: isCurrentDay 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))' 
              : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            borderColor: isCurrentDay ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isCurrentDay ? '0 10px 25px rgba(0, 0, 0, 0.3)' : 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = isCurrentDay 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))' 
              : 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <div 
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '4px',
              color: isCurrentDay ? 'white' : '#e5e7eb'
            }}
          >
            {day}
          </div>
          <div style={{ overflowY: 'auto', maxHeight: '72px' }}>
            {dayEvents.slice(0, 2).map(event => (
              <div 
                key={event.id}
                style={{
                  fontSize: '12px',
                  padding: '4px',
                  borderRadius: '8px',
                  marginBottom: '2px',
                  cursor: 'pointer',
                  color: 'white',
                  background: getCategoryColor(event.category),
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title={event.title}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                {getCategoryIcon(event.category)}
                <span style={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {event.title}
                </span>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div style={{ fontSize: '12px', color: '#d1d5db', fontWeight: '500' }}>
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        padding: '32px'
      }}>
        {/* Calendar Header with Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => navigateMonth(-1)}
            style={{
              padding: '12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'scale(1)';
            }}
            title="Previous Month"
          >
            <ChevronLeft style={{ width: '24px', height: '24px' }} />
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, white, #e5e7eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 8px 0'
            }}>
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={goToToday}
              style={{
                fontSize: '14px',
                color: '#93c5fd',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#bfdbfe';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#93c5fd';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Go to Today
            </button>
          </div>
          
          <button
            onClick={() => navigateMonth(1)}
            style={{
              padding: '12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'scale(1)';
            }}
            title="Next Month"
          >
            <ChevronRight style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
        
        {/* Day Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {dayNames.map(day => (
            <div 
              key={day} 
              style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#e5e7eb',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '32px'
        }}>
          {days}
        </div>

        {/* Calendar Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '14px'
        }}>
          {[
            { category: 'hackathon', label: 'Hackathons' },
            { category: 'tech', label: 'Tech Events' },
            { category: 'celebration', label: 'Celebrations' },
            { category: 'exam', label: 'Exams' },
            { category: 'academic', label: 'Academic' }
          ].map(({ category, label }) => (
            <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: getCategoryColor(category)
              }}></div>
              <span style={{ color: '#e5e7eb' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sortedEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
            }}>
              <Calendar size={64} style={{ margin: '0 auto 24px', color: '#9ca3af', opacity: 0.5 }} />
              <p style={{ fontSize: '20px', color: '#e5e7eb' }}>No events found</p>
            </div>
          </div>
        ) : (
          sortedEvents.map(event => (
            <div
              key={event.id}
              style={{
                background: isToday(event.date) 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1))'
                  : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(24px)',
                border: isToday(event.date) 
                  ? '2px solid rgba(248, 113, 113, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                padding: '24px',
                transition: 'all 0.5s ease',
                cursor: 'pointer',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = isToday(event.date) 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1))'
                  : 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                      width: '12px',
                      height: '32px',
                      borderRadius: '20px',
                      background: getCategoryColor(event.category)
                    }}></div>
                    <h3 style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: isToday(event.date) ? '#fecaca' : 'white',
                      margin: 0,
                      transition: 'color 0.3s ease'
                    }}>
                      {event.title}
                    </h3>
                    {getCategoryIcon(event.category) && (
                      <div style={{
                        padding: '8px',
                        borderRadius: '50%',
                        background: getCategoryColor(event.category)
                      }}>
                        {getCategoryIcon(event.category)}
                      </div>
                    )}
                    {isToday(event.date) && (
                      <span style={{
                        background: 'linear-gradient(135deg, #ef4444, #ec4899)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        animation: 'pulse 2s infinite'
                      }}>
                        <Clock size={14} />
                        Today
                      </span>
                    )}
                  </div>
                  <p style={{
                    color: '#e5e7eb',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '18px'
                  }}>
                    <Calendar size={18} />
                    {formatDate(event.date)}
                  </p>
                  {event.description && (
                    <p style={{
                      color: '#d1d5db',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      margin: 0
                    }}>
                      {event.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  style={{
                    color: '#9ca3af',
                    background: 'transparent',
                    border: 'none',
                    marginLeft: '24px',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#f87171';
                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#9ca3af';
                    e.target.style.background = 'transparent';
                  }}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #312e81, #7c3aed, #be185d)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            top: '-160px',
            left: '-160px',
            width: '320px',
            height: '320px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: 'pulse 4s infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-160px',
            width: '384px',
            height: '384px',
            background: 'rgba(147, 51, 234, 0.1)',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: 'pulse 4s infinite',
            animationDelay: '1s'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-160px',
            left: '50%',
            width: '320px',
            height: '320px',
            background: 'rgba(236, 72, 153, 0.1)',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: 'pulse 4s infinite',
            animationDelay: '2s'
          }}></div>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 10 }}>
          <h1 style={{
            fontSize: '96px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, white, #bfdbfe, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 16px 0',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
          }}>
            College Event Manager
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#e5e7eb',
            fontWeight: '500',
            margin: 0
          }}>
            Never miss an important date again! ✨
          </p>
        </div>

        {/* Controls */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          padding: '32px',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* View Toggle */}
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <button
                onClick={() => setView('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: view === 'list' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transform: view === 'list' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: view === 'list' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (view !== 'list') {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (view !== 'list') {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <List size={22} />
                <span>List View</span>
              </button>
              <button
                onClick={() => setView('calendar')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: view === 'calendar' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transform: view === 'calendar' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: view === 'calendar' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (view !== 'calendar') {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (view !== 'calendar') {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <Calendar size={22} />
                <span>Calendar View</span>
              </button>
            </div>

            {/* Search by Date */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '12px 24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              minWidth: '320px'
            }}>
              <Search size={22} style={{ color: '#93c5fd' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{
                  fontSize: '12px',
                  color: '#d1d5db',
                  marginBottom: '4px'
                }}>
                  Search by Date
                </label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '18px',
                    width: '100%'
                  }}
                  placeholder="Select date to filter events"
                />
              </div>
              {searchDate && (
                <button
                  onClick={() => setSearchDate('')}
                  style={{
                    color: '#d1d5db',
                    background: 'transparent',
                    border: 'none',
                    padding: '4px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#f87171';
                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#d1d5db';
                    e.target.style.background = 'transparent';
                  }}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #3b82f6, #9333ea)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
              }}
            >
              <Plus size={24} />
              Add Event
            </button>
          </div>
        </div>

        {/* Search Results Header */}
        {searchDate && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Search size={24} style={{ color: '#93c5fd' }} />
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0
                }}>
                  Events for {formatDate(searchDate)}
                </h2>
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </span>
              </div>
              <button
                onClick={() => setSearchDate('')}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #ec4899)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #dc2626, #db2777)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #ef4444, #ec4899)';
                }}
              >
                <X size={18} />
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Events Display */}
        <div style={{ marginBottom: '32px', position: 'relative', zIndex: 10 }}>
          {view === 'list' ? renderListView() : renderCalendarView()}
        </div>

        {/* Enhanced Stats Dashboard */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          padding: '32px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Event Statistics
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(4, 1fr)',
            gap: '24px'
          }}>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #60a5fa, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {events.length}
              </div>
              <p style={{ color: '#e5e7eb', fontWeight: 'bold', margin: 0 }}>Total Events</p>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f87171, #fb7185)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {events.filter(event => isToday(event.date)).length}
              </div>
              <p style={{ color: '#e5e7eb', fontWeight: 'bold', margin: 0 }}>Today's Events</p>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {events.filter(event => new Date(event.date) > new Date()).length}
              </div>
              <p style={{ color: '#e5e7eb', fontWeight: 'bold', margin: 0 }}>Upcoming Events</p>
            </div>
            <div style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #facc15, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                {events.filter(event => event.category === 'hackathon').length}
              </div>
              <p style={{ color: '#e5e7eb', fontWeight: 'bold', margin: 0 }}>Hackathons</p>
            </div>
          </div>
        </div>

        {/* Add Event Form Modal */}
        {showAddForm && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 50
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              padding: '32px',
              width: '100%',
              maxWidth: '512px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0
                }}>
                  Add New Event ✨
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  style={{
                    color: '#d1d5db',
                    background: 'transparent',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#d1d5db';
                    e.target.style.background = 'transparent';
                  }}
                >
                  <X size={28} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#e5e7eb',
                    marginBottom: '12px'
                  }}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      color: 'white',
                      outline: 'none',
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter event title"
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#e5e7eb',
                    marginBottom: '12px'
                  }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      color: 'white',
                      outline: 'none',
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#e5e7eb',
                    marginBottom: '12px'
                  }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      color: 'white',
                      outline: 'none',
                      fontSize: '18px',
                      transition: 'all 0.3s ease',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter event description (optional)"
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px', paddingTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddEvent}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #3b82f6, #9333ea)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CSS Animations */}
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EventManagementApp;