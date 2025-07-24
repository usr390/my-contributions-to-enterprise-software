'use client';

import React, { useState } from 'react';

type BeforeAfterMockupProps = {
  type: 'form-error' | 'report-form-defaults' | 'priority-members' | 'responsive-buttons' | 'pdf-row-height' | 'on-demand-filters' | 'filter-caching' | 'modal-accessibility' | 'dropdown-focus-accessibility';
  show: 'before' | 'after';
};

const star = (
  <span style={{ color: '#f5c518', marginLeft: 4, fontSize: 16 }} title="Priority">★</span>
);

const members = [
  { name: 'Alice', date: '2024-07-01', priority: false },
  { name: 'Bob', date: '2024-07-02', priority: true },
  { name: 'Carol', date: '2024-07-03', priority: true },
  { name: 'David', date: '2024-07-04', priority: false },
];

// Animated dots for loading (move outside main component)
function AnimatedDots() {
  const [dots, setDots] = React.useState('.');
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d.length < 3 ? d + '.' : '.'));
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ color: '#888', fontSize: 13 }}>Loading{dots}</span>;
}

export default function BeforeAfterMockup({ type, show }: BeforeAfterMockupProps) {
  // All hooks must be called unconditionally and in the same order
  const [filterPriority, setFilterPriority] = useState(true);
  const [email, setEmail] = useState('');
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const valid = isValidEmail(email);
  // For on-demand-filters (multi-dropdowns)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [loadingDropdown, setLoadingDropdown] = useState<number | null>(null);
  // For filter-caching (single dropdown)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cached, setCached] = useState(false);
  // For report-form-defaults
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sort, setSort] = useState('');

  if (type === 'form-error') {
    return (
      <div style={{ marginBottom: 18 }}>
        {show === 'before' && (
          <div style={{ maxWidth: 340, position: 'relative' }}>
            {/* Modal error alert overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.18)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: '#fff',
                border: '1.5px solid #b00020',
                borderRadius: 8,
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                padding: '10px 16px 8px 16px',
                minWidth: 140,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{ color: '#b00020', fontWeight: 600, fontSize: 13, marginBottom: 8, textAlign: 'center' }}>
                  Error: Please enter a valid email address.
                </div>
                <button style={{ marginTop: 2, padding: '3px 12px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', cursor: 'pointer', fontSize: 13 }}>OK</button>
              </div>
            </div>
            <div className="wire-label">Email</div>
            <input className="wire-input" defaultValue="not-an-email" readOnly />
            <button style={{ marginTop: 16, padding: '7px 22px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', fontSize: 14, cursor: 'pointer' }}>Submit</button>
          </div>
        )}
        {show === 'after' && (
          <div style={{ maxWidth: 340 }}>
            <div className="wire-label">Email</div>
            <input
              className="wire-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={{ marginBottom: 0 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              {valid ? (
                <span className="wire-validate" style={{ color: '#1a7f37' }}>✓ Valid</span>
              ) : email ? (
                <span style={{ color: '#b00020', fontSize: 13 }}>Please enter a valid email address.</span>
              ) : null}
              <button
                style={{ padding: '7px 22px', borderRadius: 4, border: '1px solid #bbb', background: valid ? '#fff' : '#f5f5f5', fontSize: 14, cursor: valid ? 'pointer' : 'not-allowed', color: valid ? '#222' : '#bbb' }}
                disabled={!valid}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'report-form-defaults') {
    // State for form fields
    // For after: pre-fill with sensible defaults
    const today = new Date();
    const toDefault = today.toISOString().slice(0, 10);
    const fromDefault = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    // Validation
    const allFilled = from && to && sort;
    // For after, initialize defaults on first render
    React.useEffect(() => {
      if (show === 'after') {
        setFrom(fromDefault);
        setTo(toDefault);
        setSort('Date (desc)');
      }
    }, [show]);
    return (
      <div style={{ marginBottom: 18, maxWidth: 400 }}>
        <div className="wire-label">
          From<span style={{ color: '#b00020' }}> *</span>
        </div>
        <input
          type="date"
          className="wire-input"
          value={from}
          onChange={e => setFrom(e.target.value)}
          style={{ marginBottom: 2 }}
        />
        {show === 'before' && !from && <div className="wire-error">Please select a from date</div>}
        <div className="wire-label">
          To<span style={{ color: '#b00020' }}> *</span>
        </div>
        <input
          type="date"
          className="wire-input"
          value={to}
          onChange={e => setTo(e.target.value)}
          style={{ marginBottom: 2 }}
        />
        {show === 'before' && !to && <div className="wire-error">Please select a to date</div>}
        <div className="wire-label">
          Sort By<span style={{ color: '#b00020' }}> *</span>
        </div>
        <select
          className="wire-input"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ marginBottom: 2 }}
        >
          <option value="">Select sort method</option>
          <option value="Date (desc)">Date (desc)</option>
          <option value="Date (asc)">Date (asc)</option>
        </select>
        {show === 'before' && !sort && <div className="wire-error">Please select a sort method</div>}
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <button
            style={{
              padding: '8px 28px',
              borderRadius: 4,
              border: '1px solid #bbb',
              background: allFilled ? '#fff' : '#f5f5f5',
              color: allFilled ? '#222' : '#bbb',
              fontSize: 15,
              fontWeight: 500,
              cursor: allFilled ? 'pointer' : 'not-allowed',
              opacity: allFilled ? 1 : 0.6,
            }}
            disabled={!allFilled}
          >
            Print Report
          </button>
        </div>
      </div>
    );
  }

  if (type === 'priority-members') {
    const filtered = filterPriority ? members.filter(m => m.priority) : members;
    return (
      <div style={{ marginBottom: 18, maxWidth: 400 }}>
        {/* Filter UI: [checkbox] [label] [star icon] in a row, label clickable */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#555', fontWeight: 500, cursor: 'pointer', marginBottom: 0, userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={filterPriority}
              onChange={() => setFilterPriority(v => !v)}
              style={{ marginRight: 4 }}
            />
            Priority Members
          </label>
          {show === 'after' && (
            <span style={{ color: '#f5c518', marginLeft: 2, fontSize: 16 }} title="Priority Member">★</span>
          )}
        </div>
        {/* Grid UI, styled to match other case studies */}
        <div style={{ border: '1px solid #bbb', borderRadius: 6, background: '#fff', width: 260, fontSize: 13, overflow: 'hidden' }}>
          <div style={{ display: 'flex', background: '#f5f5f5', fontWeight: 500 }}>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Member</div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Visit Date</div>
          </div>
          {filtered.map((m, i) => (
            <div key={m.name} style={{ display: 'flex', background: i % 2 === 1 ? '#fafbfc' : undefined }}>
              <div style={{ flex: 1, padding: '6px 10px', display: 'flex', alignItems: 'center' }}>
                {m.name}
                {show === 'after' && m.priority && (
                  <span style={{ color: '#f5c518', marginLeft: 4, fontSize: 16 }} title="Priority Member">★</span>
                )}
              </div>
              <div style={{ flex: 1, padding: '6px 10px' }}>{m.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'responsive-buttons') {
    // Button labels
    const buttons = [
      'Print PDF',
      'Print CSV',
      'Export',
      'Share',
    ];
    // Simple data grid mockup
    const grid = (
      <div style={{
        marginTop: 18,
        border: '1px solid #bbb',
        borderRadius: 6,
        background: '#fff',
        width: 340,
        fontSize: 13,
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', background: '#f5f5f5', fontWeight: 500 }}>
          <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Name</div>
          <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Status</div>
          <div style={{ flex: 1, padding: '6px 10px' }}>Type</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Report 1</div>
          <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Ready</div>
          <div style={{ flex: 1, padding: '6px 10px' }}>Summary</div>
        </div>
        <div style={{ display: 'flex', background: '#fafbfc' }}>
          <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Report 2</div>
          <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Pending</div>
          <div style={{ flex: 1, padding: '6px 10px' }}>Detail</div>
        </div>
      </div>
    );

    if (show === 'before') {
      return (
        <div style={{ marginBottom: 18, maxWidth: 300 }}>
          {/* Awkwardly wrapped buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 0 }}>
            <button style={{ flex: '0 0 auto', marginRight: 8, marginBottom: 0, marginTop: 0, padding: '6px 14px', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}>{buttons[0]}</button>
            <button style={{ flex: '0 0 auto', marginRight: 8, marginBottom: 0, marginTop: 0, padding: '6px 14px', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}>{buttons[1]}</button>
            <button style={{ flex: '0 0 auto', marginRight: 0, marginBottom: 0, marginTop: 0, padding: '6px 14px', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}>{buttons[2]}</button>
          </div>
          {/* 4th button awkwardly below, touching the row above and misaligned */}
          <div style={{ display: 'flex' }}>
            <button style={{ flex: '0 0 auto', marginLeft: 32, marginRight: 0, marginTop: 0, marginBottom: 0, padding: '6px 14px', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}>{buttons[3]}</button>
          </div>
          {grid}
        </div>
      );
    }
    // After: Responsive, neat button row
    return (
      <div style={{ marginBottom: 18, maxWidth: 300 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 0,
          }}
        >
          {buttons.map((label, i) => (
            <button
              key={label}
              style={{
                flex: '1 1 120px',
                minWidth: 100,
                margin: 0,
                padding: '6px 14px',
                border: '1px solid #bbb',
                borderRadius: 4,
                background: '#fff',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {grid}
      </div>
    );
  }

  if (type === 'pdf-row-height') {
    // Example data
    const id = '123456789';
    const name = 'John Doe';
    if (show === 'before') {
      return (
        <div style={{ marginBottom: 18, maxWidth: 260 }}>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>PDF Table (Before: ID wraps, double row height)</div>
          <div style={{ border: '1px solid #bbb', borderRadius: 6, overflow: 'hidden', background: '#fff', width: 220, fontSize: 13 }}>
            <div style={{ display: 'flex', background: '#f5f5f5', fontWeight: 500 }}>
              <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee' }}>ID</div>
              <div style={{ flex: 1, padding: '6px 10px' }}>Name</div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 36 }}>
              {/* ID cell with only the last digit wrapped */}
              <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', wordBreak: 'break-all', lineHeight: 1.2 }}>
                12345678<br />9
              </div>
              <div style={{ flex: 1, padding: '6px 10px' }}>{name}</div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 36, background: '#fafbfc' }}>
              <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', wordBreak: 'break-all', lineHeight: 1.2 }}>
                98765432<br />1
              </div>
              <div style={{ flex: 1, padding: '6px 10px' }}>Jane Smith</div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 36 }}>
              <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', wordBreak: 'break-all', lineHeight: 1.2 }}>
                55555555<br />5
              </div>
              <div style={{ flex: 1, padding: '6px 10px' }}>Alex Kim</div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 36, background: '#fafbfc' }}>
              <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', wordBreak: 'break-all', lineHeight: 1.2 }}>
                24681357<br />9
              </div>
              <div style={{ flex: 1, padding: '6px 10px' }}>Maria Lopez</div>
            </div>
          </div>
        </div>
      );
    }
    // After: ID column wide enough, no wrap
    return (
      <div style={{ marginBottom: 18, maxWidth: 260 }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>PDF Table (After: ID fits, single row height)</div>
        <div style={{ border: '1px solid #bbb', borderRadius: 6, overflow: 'hidden', background: '#fff', width: 220, fontSize: 13 }}>
          <div style={{ display: 'flex', background: '#f5f5f5', fontWeight: 500 }}>
            <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee' }}>ID</div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Name</div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 24 }}>
            <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', whiteSpace: 'nowrap' }}>
              123456789
            </div>
            <div style={{ flex: 1, padding: '6px 10px' }}>John Doe</div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 24, background: '#fafbfc' }}>
            <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', whiteSpace: 'nowrap' }}>
              987654321
            </div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Jane Smith</div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 24 }}>
            <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', whiteSpace: 'nowrap' }}>
              555555555
            </div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Alex Kim</div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #eee', minHeight: 24, background: '#fafbfc' }}>
            <div style={{ width: 110, padding: '6px 10px', borderRight: '1px solid #eee', whiteSpace: 'nowrap' }}>
              246813579
            </div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Maria Lopez</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'on-demand-filters') {
    const filters = ['Status', 'Type', 'Owner', 'Date'];
    const options = ['Option A', 'Option B', 'Option C'];
    // Simple data grid mockup
    const grid = (
      <div style={{ width: '100%' }}>
        <div style={{
          marginTop: 18,
          border: '1px solid #bbb',
          borderRadius: 6,
          background: '#fff',
          minWidth: 420,
          fontSize: 13,
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', background: '#f5f5f5', fontWeight: 500 }}>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Name</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Status</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Type</div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Owner</div>
            <div style={{ flex: 1, padding: '6px 10px' }}>Location</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Report 1</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Ready</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Summary</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Alice</div>
            <div style={{ flex: 1, padding: '6px 10px' }}>NYC</div>
          </div>
          <div style={{ display: 'flex', background: '#fafbfc' }}>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Report 2</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Pending</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Detail</div>
            <div style={{ flex: 1, padding: '6px 10px', borderRight: '1px solid #eee' }}>Bob</div>
            <div style={{ flex: 1, padding: '6px 10px' }}>LA</div>
          </div>
        </div>
      </div>
    );
    if (show === 'before') {
      return (
        <div style={{ marginBottom: 18, maxWidth: 420 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8, justifyContent: 'center' }}>
            {filters.map((label, i) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 90px', minWidth: 90, maxWidth: 140, width: 'auto', position: 'relative', marginBottom: 8 }}>
                <button
                  style={{ width: '100%', minWidth: 80, maxWidth: 140, padding: '6px 0', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}
                  onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                >
                  {label} ▼
                </button>
                <span style={{ fontSize: 11, color: '#1a7f37', marginTop: 4, minHeight: 16, display: 'block', textAlign: 'center', fontWeight: 500 }}>loaded on init.</span>
                {openDropdown === i && (
                  <div style={{ position: 'absolute', top: 36, left: 0, width: '100%', minWidth: 80, maxWidth: 140, background: '#fff', border: '1px solid #bbb', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1 }}>
                    {options.map(opt => (
                      <div key={opt} style={{ padding: '7px 12px', fontSize: 13, color: '#444', cursor: 'pointer' }}>{opt}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {grid}
        </div>
      );
    }
    // After: Responsive dropdowns
    return (
      <div style={{ marginBottom: 18, maxWidth: 420 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 8, justifyContent: 'center' }}>
          {filters.map((label, i) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1 1 90px', minWidth: 90, maxWidth: 140, width: 'auto', position: 'relative', marginBottom: 8 }}>
              <button
                style={{ width: '100%', minWidth: 80, maxWidth: 140, padding: '6px 0', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}
                onClick={() => {
                  if (openDropdown === i) return setOpenDropdown(null);
                  setOpenDropdown(i);
                  setLoadingDropdown(i);
                  setTimeout(() => setLoadingDropdown(null), 200);
                }}
              >
                {label} ▼
              </button>
              <span style={{ fontSize: 11, color: '#888', marginTop: 4, minHeight: 16, display: 'block', textAlign: 'center' }}>loads on click</span>
              {openDropdown === i && (
                <div style={{ position: 'absolute', top: 36, left: 0, width: '100%', minWidth: 80, maxWidth: 140, background: '#fff', border: '1px solid #bbb', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1 }}>
                  {loadingDropdown === i ? (
                    <div style={{ padding: '12px', textAlign: 'center' }}><AnimatedDots /></div>
                  ) : (
                    options.map(opt => (
                      <div key={opt} style={{ padding: '7px 12px', fontSize: 13, color: '#444', cursor: 'pointer' }}>{opt}</div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {grid}
      </div>
    );
  }

  if (type === 'filter-caching') {
    const options = ['Option A', 'Option B', 'Option C'];
    if (show === 'before') {
      // Acts like case 5 after: always shows loading animation on open
      return (
        <div style={{ marginBottom: 18, maxWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>No caching. Dropdown loads every time it is opened:</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 140, position: 'relative' }}>
            <button
              style={{ width: 140, padding: '6px 0', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}
              onClick={() => {
                setOpen(o => !o);
                setLoading(true);
                setTimeout(() => setLoading(false), 500);
              }}
            >
              Status ▼
            </button>
            <span style={{ fontSize: 11, color: '#888', marginTop: 4, minHeight: 16, display: 'block', textAlign: 'center' }}>loads on click</span>
            {open && (
              <div style={{ position: 'absolute', top: 36, left: 0, width: 140, background: '#fff', border: '1px solid #bbb', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1 }}>
                {loading ? (
                  <div style={{ padding: '12px', textAlign: 'center' }}><AnimatedDots /></div>
                ) : (
                  options.map(opt => (
                    <div key={opt} style={{ padding: '7px 12px', fontSize: 13, color: '#444', cursor: 'pointer' }}>{opt}</div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
  
    // After: first open shows loading, subsequent opens are instant (cached)
    return (
      <div style={{ marginBottom: 18, maxWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>
          Caching added. Loads once, then opens instantly:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 140, position: 'relative' }}>
          <button
            style={{ width: 140, padding: '6px 0', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer' }}
            onClick={() => {
              setOpen(o => !o);
              if (!cached && !open) {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setCached(true);
                }, 500);
              }
            }}
          >
            Status ▼
          </button>
          <span style={{ fontSize: 11, color: cached ? '#1a7f37' : '#888', marginTop: 4, minHeight: 16, display: 'block', textAlign: 'center', fontWeight: cached ? 500 : undefined }}>
            {cached ? 'cached' : 'loads on click'}
          </span>
          {open && (
            <div style={{ position: 'absolute', top: 36, left: 0, width: 140, background: '#fff', border: '1px solid #bbb', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1 }}>
              {loading ? (
                <div style={{ padding: '12px', textAlign: 'center' }}><AnimatedDots /></div>
              ) : (
                options.map(opt => (
                  <div key={opt} style={{ padding: '7px 12px', fontSize: 13, color: '#444', cursor: 'pointer' }}>{opt}</div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  

  if (type === 'dropdown-focus-accessibility') {
    // Dropdown options
    const options = ['Option 1', 'Option 2', 'Option 3'];
    // Next UI element
    const nextElement = <button style={{ marginTop: 18, padding: '6px 18px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Next Field</button>;
    if (show === 'before') {
      return (
        <div style={{ marginBottom: 18, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 180, position: 'relative', marginBottom: 12 }}>
            <button style={{ width: '100%', padding: '6px 0', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>Dropdown ▼</button>
            <div style={{ position: 'absolute', top: 36, left: 0, width: '100%', background: '#fff', border: '1px solid #bbb', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1 }}>
              {options.map(opt => (
                <div key={opt} style={{ padding: '7px 12px', fontSize: 13, color: '#444' }}>{opt}</div>
              ))}
            </div>
            {/* Arrow indicating focus skips to next field */}
            <div style={{ position: 'absolute', top: 36, right: -38, display: 'flex', alignItems: 'center', height: 32 }}>
              <span style={{ fontSize: 18, color: '#b00020', fontWeight: 700, marginRight: 2 }}>→</span>
              <span style={{ fontSize: 12, color: '#b00020' }}>skips</span>
            </div>
          </div>
          {nextElement}
          <button style={{ marginTop: 18, padding: '7px 22px', borderRadius: 4, border: '2px solid #1a7f37', background: '#fff', fontSize: 14, cursor: 'pointer', outline: '2px solid #1a7f37', outlineOffset: 2, fontWeight: 500 }}>Submit</button>
        </div>
      );
    }
    // After: Focus moves to first dropdown option, Submit button normal
    return (
      <div style={{ marginBottom: 18, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 180, position: 'relative', marginBottom: 12 }}>
          <button style={{ width: '100%', padding: '6px 0', border: '1px solid #bbb', borderRadius: 4, background: '#fff', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>Dropdown ▼</button>
          <div style={{ position: 'absolute', top: 36, left: 0, width: '100%', background: '#fff', border: '1px solid #bbb', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1 }}>
            {options.map((opt, i) => (
              <div key={opt} style={{ padding: '7px 12px', fontSize: 13, color: '#444', outline: i === 0 ? '2px solid #1a7f37' : 'none', borderRadius: i === 0 ? 4 : 0, background: i === 0 ? '#eafbe7' : undefined }}>{opt}</div>
            ))}
          </div>
        </div>
        {nextElement}
        <button style={{ marginTop: 18, padding: '7px 22px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>Submit</button>
      </div>
    );
  }

  if (type === 'modal-accessibility') {
    // Modal styles
    const modalStyle = {
      width: 200,
      minHeight: 50,
      background: '#fff',
      border: '1px solid #bbb',
      borderRadius: 10,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      position: 'absolute' as const,
      padding: '8px 8px 16px 8px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
    };
    const xBase = {
      position: 'absolute' as const,
      top: 12,
      right: 12,
      fontSize: 22,
      fontWeight: 400,
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0,
      lineHeight: 1,
    };
    if (show === 'before') {
      return (
        <div style={{ marginBottom: 18, minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={modalStyle}>
            <button style={{ ...xBase, color: '#f7f7f7' }} aria-label="Close">×</button>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 18, marginTop: 8, color: '#222' }}>Delete Item?</div>
            <div style={{ fontSize: 13, color: '#555', marginBottom: 16, textAlign: 'center' }}>Are you sure you want to delete this item? This action cannot be undone.</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', width: '100%' }}>
              <button style={{ padding: '7px 18px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button style={{ padding: '7px 18px', borderRadius: 4, border: '1px solid #b00020', background: '#fff0f0', color: '#b00020', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Yes</button>
            </div>
          </div>
        </div>
      );
    }
    // After: High-contrast X icon
    return (
      <div style={{ marginBottom: 18, minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={modalStyle}>
          <button style={{ ...xBase, color: '#111' }} aria-label="Close">×</button>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 18, marginTop: 8, color: '#222' }}>Delete Item?</div>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 16, textAlign: 'center' }}>Are you sure you want to delete this item? This action cannot be undone.</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', width: '100%' }}>
            <button style={{ padding: '7px 18px', borderRadius: 4, border: '1px solid #bbb', background: '#fff', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
            <button style={{ padding: '7px 18px', borderRadius: 4, border: '1px solid #b00020', background: '#fff0f0', color: '#b00020', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Yes</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 