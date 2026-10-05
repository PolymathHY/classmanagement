import React, { useState } from 'react';
import { 
  Users, Coins, Award, CheckCircle2, PlusCircle, MinusCircle, 
  Sparkles, Search, Filter, ShoppingBag, ClipboardList, History, 
  ArrowUpDown, CheckSquare, Square, Edit3, Trash2
} from 'lucide-react';

export default function TeacherDashboard({
  students,
  roles,
  products,
  logs,
  settings,
  onGiveCurrency,
  onGiveExp,
  onUpdateRoleAssignment,
  onAddRole,
  onAddProduct,
  onDeleteProduct
}) {
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'roles' | 'store' | 'logs'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('number'); // 'number' | 'balance' | 'level'
  
  // Selection for bulk action
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  
  // Modal states
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('currency'); // 'currency' | 'exp'
  const [modalTargetStudent, setModalTargetStudent] = useState(null); // null means bulk
  const [amountInput, setAmountInput] = useState(50);
  const [reasonInput, setReasonInput] = useState('학급 활동 적극 참여');

  // Role Modal state
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleReward, setNewRoleReward] = useState(30);
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleIcon, setNewRoleIcon] = useState('⭐');

  // Product Modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(300);
  const [newProdCategory, setNewProdCategory] = useState('coupon');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Statistics calculation
  const totalStudentsCount = students.length;
  const avgLevel = (students.reduce((acc, s) => acc + s.level, 0) / totalStudentsCount).toFixed(1);
  const totalBalance = students.reduce((acc, s) => acc + s.balance, 0);
  const avgBalance = Math.round(totalBalance / totalStudentsCount);
  const completedTaskCount = students.filter(s => s.taskCompletedToday).length;
  const completionRate = Math.round((completedTaskCount / totalStudentsCount) * 100);

  // Filter & Sort Students
  const filteredStudents = students
    .filter(s => s.name.includes(searchTerm) || s.number.toString().includes(searchTerm))
    .sort((a, b) => {
      if (sortBy === 'balance') return b.balance - a.balance;
      if (sortBy === 'level') return b.level - a.level || b.exp - a.exp;
      return a.number - b.number;
    });

  // Checkbox Selection
  const toggleSelectAll = () => {
    if (selectedStudentIds.length === filteredStudents.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredStudents.map(s => s.id));
    }
  };

  const toggleSelectStudent = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Open Transaction Modal
  const openTransactionModal = (targetStudent = null, type = 'currency') => {
    setModalTargetStudent(targetStudent);
    setTransactionType(type);
    setAmountInput(type === 'currency' ? 50 : 30);
    setReasonInput(type === 'currency' ? '학급 활동 적극 참여' : '수업 집중 및 태도 우수');
    setShowTransactionModal(true);
  };

  const handleExecuteTransaction = (e) => {
    e.preventDefault();
    const targetIds = modalTargetStudent ? [modalTargetStudent.id] : selectedStudentIds;
    if (targetIds.length === 0) return;

    if (transactionType === 'currency') {
      onGiveCurrency(targetIds, Number(amountInput), reasonInput);
    } else {
      onGiveExp(targetIds, Number(amountInput), reasonInput);
    }

    setShowTransactionModal(false);
    setSelectedStudentIds([]);
  };

  // Create Role Submit
  const handleCreateRole = (e) => {
    e.preventDefault();
    onAddRole({
      name: newRoleName,
      reward: Number(newRoleReward),
      description: newRoleDesc,
      icon: newRoleIcon
    });
    setNewRoleName('');
    setNewRoleDesc('');
    setShowAddRoleModal(false);
  };

  // Create Product Submit
  const handleCreateProduct = (e) => {
    e.preventDefault();
    onAddProduct({
      name: newProdName,
      price: Number(newProdPrice),
      category: newProdCategory,
      description: newProdDesc,
      icon: newProdCategory === 'coupon' ? '🎟️' : '🎁',
      stock: 10
    });
    setNewProdName('');
    setNewProdDesc('');
    setShowAddProductModal(false);
  };

  return (
    <div>
      {/* 1. Summary Statistics Dashboard Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '14px', color: '#818cf8' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>학급 인원 / 평균 레벨</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>
              {totalStudentsCount}명 <span style={{ fontSize: '16px', color: '#a5b4fc', fontWeight: '600' }}>(평균 Lv.{avgLevel})</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '14px', color: '#fbbf24' }}>
            <Coins size={28} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>총 학급 화폐 / 평균 잔액</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#fcd34d' }}>
              🪙 {totalBalance.toLocaleString()} <span style={{ fontSize: '14px', color: '#fbbf24' }}>(평균 {avgBalance} {settings.currencyName})</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '14px', color: '#34d399' }}>
            <CheckCircle2 size={28} />
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>오늘의 1인 1역 완료율</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#6ee7b7' }}>
              {completedTaskCount} / {totalStudentsCount}명 <span style={{ fontSize: '14px', color: '#34d399' }}>({completionRate}%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '24px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('students')}
          className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Users size={18} /> 학생 화폐/EXP 관리 ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`btn ${activeTab === 'roles' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <ClipboardList size={18} /> 1인 1역 역할 배정 ({roles.length})
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`btn ${activeTab === 'store' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <ShoppingBag size={18} /> 학급 상점 관리 ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`btn ${activeTab === 'logs' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <History size={18} /> 수여 & 내역 히스토리
        </button>
      </div>

      {/* TAB 1: Student List & Currency/EXP Management */}
      {activeTab === 'students' && (
        <div>
          {/* Controls Bar */}
          <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            
            {/* Search & Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '260px' }}>
              <div style={{ position: 'relative', flex: '1' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="학생 이름 또는 번호 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowUpDown size={16} color="var(--text-muted)" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(15, 23, 42, 0.8)',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                >
                  <option value="number">번호순 정렬</option>
                  <option value="balance">화폐 많은 순</option>
                  <option value="level">레벨 높음 순</option>
                </select>
              </div>
            </div>

            {/* Bulk Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={toggleSelectAll} className="btn btn-secondary btn-sm">
                {selectedStudentIds.length === filteredStudents.length ? <CheckSquare size={16} /> : <Square size={16} />}
                {selectedStudentIds.length === filteredStudents.length ? '전체 해제' : '전체 선택'}
              </button>

              <button
                disabled={selectedStudentIds.length === 0}
                onClick={() => openTransactionModal(null, 'currency')}
                className="btn btn-gold btn-sm"
                style={{ opacity: selectedStudentIds.length === 0 ? 0.4 : 1 }}
              >
                <Coins size={16} /> 선택 학생({selectedStudentIds.length}) 화폐 지급/차감
              </button>

              <button
                disabled={selectedStudentIds.length === 0}
                onClick={() => openTransactionModal(null, 'exp')}
                className="btn btn-primary btn-sm"
                style={{ opacity: selectedStudentIds.length === 0 ? 0.4 : 1 }}
              >
                <Sparkles size={16} /> 선택 학생({selectedStudentIds.length}) EXP 부여
              </button>
            </div>

          </div>

          {/* Student Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {filteredStudents.map(student => {
              const isSelected = selectedStudentIds.includes(student.id);
              const assignedRole = roles.find(r => r.id === student.roleId);

              return (
                <div 
                  key={student.id} 
                  className="glass-card"
                  style={{
                    padding: '18px',
                    borderColor: isSelected ? 'var(--teacher-accent)' : 'rgba(255,255,255,0.1)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : undefined,
                    position: 'relative'
                  }}
                >
                  {/* Select Checkbox */}
                  <div 
                    onClick={() => toggleSelectStudent(student.id)}
                    style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}
                  >
                    {isSelected ? <CheckSquare size={20} color="var(--teacher-accent)" /> : <Square size={20} color="var(--text-muted)" />}
                  </div>

                  {/* Header: Student Name & Level */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: '800',
                      color: '#fff'
                    }}>
                      {student.number}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>{student.name}</span>
                        <span className="badge badge-amber">Lv.{student.level}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {assignedRole ? `${assignedRole.icon} ${assignedRole.name}` : '배정된 역할 없음'}
                      </div>
                    </div>
                  </div>

                  {/* Balance & EXP Progress */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>화폐 잔액:</span>
                      <span style={{ fontSize: '15px', fontWeight: '800', color: '#fcd34d' }}>
                        🪙 {student.balance.toLocaleString()} {settings.currencyName}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>경험치(EXP):</span>
                      <span>{student.exp} / {settings.expPerLevel} EXP</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${(student.exp / settings.expPerLevel) * 100}%` }} />
                    </div>
                  </div>

                  {/* Quick Individual Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button 
                      onClick={() => openTransactionModal(student, 'currency')}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <Coins size={14} color="#f59e0b" /> 화폐 지급/차감
                    </button>

                    <button 
                      onClick={() => openTransactionModal(student, 'exp')}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '12px' }}
                    >
                      <Sparkles size={14} color="#6366f1" /> EXP 부여
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Role Management */}
      {activeTab === 'roles' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800' }}>학급 1인 1역 배정 및 관리</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>24명 학생들의 학급 역할을 배정하고 수행 보상을 설정합니다.</p>
            </div>
            <button onClick={() => setShowAddRoleModal(true)} className="btn btn-primary btn-sm">
              <PlusCircle size={16} /> 새 역할 추가
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {roles.map(role => {
              const assignedStudents = students.filter(s => s.roleId === role.id);

              return (
                <div key={role.id} className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{role.icon}</span>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>{role.name}</span>
                    </div>
                    <span className="badge badge-amber">🪙 +{role.reward} {settings.currencyName}/일</span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', minHeight: '38px' }}>
                    {role.description}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      담당 학생 배정:
                    </label>
                    <select
                      value={assignedStudents[0]?.id || ''}
                      onChange={(e) => onUpdateRoleAssignment(Number(e.target.value), role.id)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(0,0,0,0.3)',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">-- 학생 선택 (미배정) --</option>
                      {students.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.number}번 {s.name} ({s.roleId === role.id ? '현재 담당' : `현재: ${roles.find(r => r.id === s.roleId)?.name || '없음'}`})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Store Management */}
      {activeTab === 'store' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800' }}>학급 상점 상품 및 쿠폰 목록</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>학생들이 학급 화폐로 구매할 수 있는 학급 쿠폰 및 아이템을 관리합니다.</p>
            </div>
            <button onClick={() => setShowAddProductModal(true)} className="btn btn-primary btn-sm">
              <PlusCircle size={16} /> 상품/쿠폰 등록
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {products.map(product => (
              <div key={product.id} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '28px' }}>{product.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>{product.name}</h3>
                      <span className={product.category === 'coupon' ? 'badge badge-indigo' : 'badge badge-emerald'}>
                        {product.category === 'coupon' ? '학급 쿠폰' : '학급 문구'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onDeleteProduct(product.id)}
                    className="btn btn-danger btn-sm" 
                    style={{ padding: '6px' }}
                    title="삭제"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', minHeight: '38px' }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#fcd34d' }}>
                    🪙 {product.price} {settings.currencyName}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    재고: {product.stock}개
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: History Logs */}
      {activeTab === 'logs' && (
        <div className="glass-card" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="var(--teacher-accent)" /> 학급 활동 & 수여 내역 히스토리
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>일시</th>
                  <th style={{ padding: '12px' }}>대상 학생</th>
                  <th style={{ padding: '12px' }}>구분</th>
                  <th style={{ padding: '12px' }}>변동 내용</th>
                  <th style={{ padding: '12px' }}>사유 / 상세 정보</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '13px' }}>{log.timestamp}</td>
                    <td style={{ padding: '12px', fontWeight: '700', color: '#fff' }}>{log.studentName}</td>
                    <td style={{ padding: '12px' }}>
                      {log.type === 'currency' && <span className="badge badge-amber">화폐</span>}
                      {log.type === 'exp' && <span className="badge badge-indigo">EXP</span>}
                      {log.type === 'purchase' && <span className="badge badge-emerald">상점 구매</span>}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      fontWeight: '800', 
                      color: log.amount > 0 ? '#6ee7b7' : '#fca5a5' 
                    }}>
                      {log.amount > 0 ? `+${log.amount}` : log.amount}
                      {log.type === 'exp' ? ' EXP' : ` ${settings.currencyName}`}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Transaction Modal (Currency / EXP) */}
      {showTransactionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {transactionType === 'currency' ? <Coins size={22} color="#f59e0b" /> : <Sparkles size={22} color="#6366f1" />}
              {modalTargetStudent ? `${modalTargetStudent.name} 학생` : `선택한 ${selectedStudentIds.length}명 학생`}
              {transactionType === 'currency' ? ' 화폐 지급/차감' : ' 경험치(EXP) 부여'}
            </h2>

            <form onSubmit={handleExecuteTransaction}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  {transactionType === 'currency' ? `수량 (${settings.currencyName} - 차감 시 음수 입력)` : '부여할 EXP 수량'}
                </label>
                
                {/* Quick Presets */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  {(transactionType === 'currency' ? [50, 100, 200, -30, -50] : [20, 30, 50, 100]).map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmountInput(val)}
                      className="btn btn-secondary btn-sm"
                    >
                      {val > 0 ? `+${val}` : val}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  수여 사유 입력
                </label>
                <input
                  type="text"
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="예: 칭찬 행동, 급식 잔반 없음, 수업 참여 우수"
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowTransactionModal(false)} className="btn btn-secondary">
                  취소
                </button>
                <button type="submit" className={transactionType === 'currency' ? 'btn btn-gold' : 'btn btn-primary'}>
                  확인 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>새 1인 1역 추가</h2>
            <form onSubmit={handleCreateRole}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>역할 아이콘 (이모지)</label>
                <input type="text" value={newRoleIcon} onChange={e => setNewRoleIcon(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} required />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>역할 이름</label>
                <input type="text" value={newRoleName} onChange={e => setNewRoleName(e.target.value)} placeholder="예: 에너지 절약 도우미" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} required />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>일일 보상 화폐 ({settings.currencyName})</label>
                <input type="number" value={newRoleReward} onChange={e => setNewRoleReward(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} required />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>역할 설명</label>
                <textarea value={newRoleDesc} onChange={e => setNewRoleDesc(e.target.value)} placeholder="역할의 세부 담당 업무를 입력하세요." style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', height: '80px' }} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAddRoleModal(false)} className="btn btn-secondary">취소</button>
                <button type="submit" className="btn btn-primary">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>상점 새 상품/쿠폰 등록</h2>
            <form onSubmit={handleCreateProduct}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>상품 구분</label>
                <select value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <option value="coupon">학급 쿠폰 (자유시간, 짝바꾸기 등)</option>
                  <option value="item">실물 문구류 (지우개, 연필 등)</option>
                </select>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>상품/쿠폰 이름</label>
                <input type="text" value={newProdName} onChange={e => setNewProdName(e.target.value)} placeholder="예: 🎟️ 짝 바꾸기 무적권" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} required />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>가격 ({settings.currencyName})</label>
                <input type="number" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }} required />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>상품 설명</label>
                <textarea value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)} placeholder="쿠폰 및 상품의 사용 조건과 혜택을 적어주세요." style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', height: '80px' }} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAddProductModal(false)} className="btn btn-secondary">취소</button>
                <button type="submit" className="btn btn-primary">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
