import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Settings, RefreshCw, Sparkles, Coins, Users } from 'lucide-react';

export default function Header({ 
  mode, 
  setMode, 
  students, 
  currentStudentId, 
  setCurrentStudentId, 
  settings, 
  setSettings,
  onResetData 
}) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currencyInput, setCurrencyInput] = useState(settings.currencyName);
  const [classNameInput, setClassNameInput] = useState(settings.className);

  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings(prev => ({
      ...prev,
      currencyName: currencyInput || '미소',
      className: classNameInput || '4학년 1반'
    }));
    setShowSettingsModal(false);
  };

  return (
    <header className="glass-card" style={{ marginBottom: '24px', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left: Class Title & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: mode === 'teacher' ? 'var(--teacher-gradient)' : 'var(--student-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: mode === 'teacher' ? '0 4px 12px rgba(99, 102, 241, 0.4)' : '0 4px 12px rgba(16, 185, 129, 0.4)'
          }}>
            {mode === 'teacher' ? '👨‍🏫' : '🎒'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
                {settings.className} 학급경제 교실
              </h1>
              <span className={mode === 'teacher' ? 'badge badge-indigo' : 'badge badge-emerald'}>
                {mode === 'teacher' ? '교사 권한 모드' : '학생 플레이 모드'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {mode === 'teacher' 
                ? '학급 화폐 지급, 경험치 부여 및 1인1역/상점 총괄 관리' 
                : `${currentStudent?.name || '학생'}의 학급 생활 & 경제 활동`
              }
            </p>
          </div>
        </div>

        {/* Right Actions: Mode Switch & Student Selector & Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Mode Switch Toggle Button */}
          <div style={{ 
            display: 'flex', 
            background: 'rgba(0,0,0,0.3)', 
            padding: '4px', 
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)' 
          }}>
            <button
              onClick={() => setMode('teacher')}
              className={`btn btn-sm ${mode === 'teacher' ? 'btn-primary' : ''}`}
              style={{
                borderRadius: '8px',
                background: mode === 'teacher' ? 'var(--teacher-gradient)' : 'transparent',
                color: mode === 'teacher' ? '#fff' : 'var(--text-muted)',
                fontWeight: mode === 'teacher' ? '700' : '500'
              }}
            >
              <ShieldCheck size={16} /> 교사 모드
            </button>
            <button
              onClick={() => setMode('student')}
              className={`btn btn-sm ${mode === 'student' ? 'btn-student' : ''}`}
              style={{
                borderRadius: '8px',
                background: mode === 'student' ? 'var(--student-gradient)' : 'transparent',
                color: mode === 'student' ? '#fff' : 'var(--text-muted)',
                fontWeight: mode === 'student' ? '700' : '500'
              }}
            >
              <UserCheck size={16} /> 학생 모드
            </button>
          </div>

          {/* Student Selector when in Student Mode */}
          {mode === 'student' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>학생 선택:</span>
              <select
                value={currentStudentId}
                onChange={(e) => setCurrentStudentId(Number(e.target.value))}
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#6ee7b7',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {students.map(s => (
                  <option key={s.id} value={s.id} style={{ background: '#0f172a', color: '#fff' }}>
                    {s.number}번 {s.name} (Lv.{s.level} | 🪙 {s.balance} {settings.currencyName})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Class Settings Button */}
          {mode === 'teacher' && (
            <>
              <button 
                onClick={() => setShowSettingsModal(true)} 
                className="btn btn-secondary btn-sm"
                title="학급 설정"
              >
                <Settings size={16} /> 설정
              </button>

              <button 
                onClick={onResetData} 
                className="btn btn-danger btn-sm"
                title="초기 데이터로 리셋"
              >
                <RefreshCw size={14} /> 리셋
              </button>
            </>
          )}

        </div>

      </div>

      {/* Class Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={22} color="var(--teacher-accent)" /> 학급 환경 설정
            </h2>
            <form onSubmit={handleSaveSettings}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  학급 명칭
                </label>
                <input
                  type="text"
                  value={classNameInput}
                  onChange={(e) => setClassNameInput(e.target.value)}
                  placeholder="예: 4학년 1반"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  학급 화폐 단위 이름 (기본값: 미소)
                </label>
                <input
                  type="text"
                  value={currencyInput}
                  onChange={(e) => setCurrencyInput(e.target.value)}
                  placeholder="예: 미소, 달란트, 코인"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                  required
                />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  학생 화면 및 수여 내역에 표시될 학급 화폐 단위를 변경합니다.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowSettingsModal(false)} className="btn btn-secondary">
                  취소
                </button>
                <button type="submit" className="btn btn-primary">
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
