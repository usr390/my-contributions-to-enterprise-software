import React from 'react';

type CaseStudyProps = {
  title: string;
  beforeDesc: string;
  afterDesc: string;
  impactDesc: string;
  before: React.ReactNode;
  after: React.ReactNode;
};

export default function CaseStudy({ title, beforeDesc, afterDesc, impactDesc, before, after }: CaseStudyProps) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 8 }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 4, textDecoration: 'underline' }}>How it worked before</h3>
          <p style={{ color: '#555', marginBottom: 10 }}>{beforeDesc}</p>
          <div style={{ border: '1.5px dashed #bbb', borderRadius: 10, padding: 20, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {before}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 4, textDecoration: 'underline' }}>How it worked after</h3>
          <p style={{ color: '#555', marginBottom: 10 }}>{afterDesc}</p>
          <div style={{ border: '1.5px dashed #bbb', borderRadius: 10, padding: 20, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {after}
          </div>
        </div>
      </div>
      <div style={{ color: '#1a7f37', fontWeight: 500, fontSize: '1rem', marginTop: 24 }}><b>Impact:</b> {impactDesc}</div>
    </section>
  );
} 