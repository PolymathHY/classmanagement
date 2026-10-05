import React, { useState } from 'react';
import { 
  Coins, Sparkles, CheckCircle2, ShoppingBag, Ticket, 
  Award, Clock, Check, Flame, ChevronRight, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentDashboard({
  student,
  roles,
  products,
  settings,
  onCompleteTask,
  onBuyProduct,
  onUseCoupon
}) {
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'store' | 'inventory'

  if (!student) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>선택된 학생 정보가 없습니다.</div>;
  }

  const assignedRole = roles.find(r => r.id === student.roleId);
  const expToNextLevel = settings.expPerLevel - student.exp;
  const progressPercent = Math.min(100, Math.round((student.exp / settings.expPerLevel) * 100));

  const handleTaskCheck = () => {
    if (!student.taskCompletedToday) {
      // Trigger joyful confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCompleteTask(student.id);
    }
  };

  const handleBuy = (product) => {
    if (student.balance < product.price) {
      alert(`잔액이 부족합니다! (필요: ${product.price}${settings.currencyName}, 보유: ${student.balance}${settings.currencyName})`);
      return;
    }

    if (confirm(`'${product.name}' 상품을 ${product.price} ${settings.currencyName}에 구매하시겠습니까?`)) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
      onBuyProduct(student.id, product);
    }
  };

  return (
    <div>
      {/* 1. My Profile & Level/Balance Card (Highest Priority) */}
      <div className="glass-card pulse-animation" style={{ padding: '24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background glow circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          background: 'rgba(16, 185, 129, 0.2)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
          
          {/* Avatar & Name & Role */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'var(--student-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: '800',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)'
            }}>
              ⭐
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>
                  {student.number}번 {student.name}
                </h2>
                <span className="badge badge-amber" style={{ fontSize: '14px', padding: '4px 12px' }}>
                  <Flame size={14} /> Lv.{student.level}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#6ee7b7', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {assignedRole ? `${assignedRole.icon} 1인 1역: ${assignedRole.name}` : '배정된 1인 1역 역할 없음'}
              </p>
            </div>
          </div>

          {/* Balance Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            padding: '16px 24px',
            borderRadius: '16px',
            textAlign: 'right',
            minWidth: '200px'
          }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>내 보유 화폐 잔액</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#fcd34d', letterSpacing: '-0.02em' }}>
              🪙 {student.balance.toLocaleString()} <span style={{ fontSize: '18px' }}>{settings.currencyName}</span>
            </div>
          </div>

        </div>

        {/* Level EXP Progress Bar */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>
            <span style={{ color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#fbbf24" /> 레벨 경험치 (EXP)
            </span>
            <span style={{ color: 'var(--text-muted)' }}>
              {student.exp} / {settings.expPerLevel} EXP (다음 레벨까지 <strong style={{ color: '#6ee7b7' }}>{expToNextLevel} EXP</strong>)
            </span>
          </div>

          <div className="progress-bar-bg" style={{ height: '14px' }}>
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

      </div>

      {/* 2. Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`btn ${activeTab === 'tasks' ? 'btn-student' : 'btn-secondary'}`}
        >
          <CheckCircle2 size={18} /> 오늘 할 일 (미션)
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`btn ${activeTab === 'store' ? 'btn-student' : 'btn-secondary'}`}
        >
          <ShoppingBag size={18} /> 학급 상점
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`btn ${activeTab === 'inventory' ? 'btn-student' : 'btn-secondary'}`}
        >
          <Ticket size={18} /> 내 보관함 ({student.coupons.length})
        </button>
      </div>

      {/* TAB 1: Today Tasks / Mission */}
      {activeTab === 'tasks' && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="#34d399" /> 오늘 나에게 주어진 1인 1역 미션
          </h3>

          {assignedRole ? (
            <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ fontSize: '42px', padding: '12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '16px' }}>
                    {assignedRole.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{assignedRole.name}</h4>
                      <span className="badge badge-amber">🪙 +{assignedRole.reward} {settings.currencyName} 보상</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '500px' }}>
                      {assignedRole.description}
                    </p>
                  </div>
                </div>

                {/* Completion Action */}
                <div>
                  {student.taskCompletedToday ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(52, 211, 153, 0.5)',
                      borderRadius: '12px',
                      color: '#6ee7b7',
                      fontWeight: '800'
                    }}>
                      <CheckCircle2 size={22} color="#10b981" /> 오늘 미션 수행 완료!
                    </div>
                  ) : (
                    <button 
                      onClick={handleTaskCheck}
                      className="btn btn-gold btn-lg"
                    >
                      <Sparkles size={20} /> 오늘 할 일 완료 체크! (+{assignedRole.reward} {settings.currencyName})
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
              <AlertCircle size={36} color="var(--text-muted)" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>현재 배정된 1인 1역이 없습니다. 교사 화면에서 역할을 배정받으세요.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Class Store */}
      {activeTab === 'store' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>학급 상점</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>모아둔 미소 화폐로 원하는 학급 쿠폰과 문구를 구매하세요!</p>
            </div>
            <span style={{ fontSize: '14px', color: '#fcd34d', fontWeight: '700' }}>
              내 잔액: 🪙 {student.balance} {settings.currencyName}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {products.map(product => {
              const canAfford = student.balance >= product.price;

              return (
                <div key={product.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '32px' }}>{product.icon}</span>
                      <span className={product.category === 'coupon' ? 'badge badge-indigo' : 'badge badge-emerald'}>
                        {product.category === 'coupon' ? '쿠폰' : '문구류'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>{product.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', minHeight: '36px' }}>
                      {product.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '18px', fontWeight: '900', color: '#fcd34d' }}>
                      🪙 {product.price} {settings.currencyName}
                    </span>

                    <button
                      onClick={() => handleBuy(product)}
                      disabled={!canAfford || product.stock <= 0}
                      className={canAfford ? 'btn btn-student btn-sm' : 'btn btn-secondary btn-sm'}
                      style={{ opacity: canAfford && product.stock > 0 ? 1 : 0.4 }}
                    >
                      <ShoppingBag size={14} /> 구매하기
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Inventory */}
      {activeTab === 'inventory' && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>
            내가 구매한 보관함 ({student.coupons.length}개)
          </h3>

          {student.coupons.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
              <Ticket size={40} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>아직 구매한 쿠폰이 없습니다. 학급 상점을 이용해 보세요!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {student.coupons.map((coupon, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '18px', opacity: coupon.used ? 0.5 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>{coupon.productName}</span>
                    <span className={coupon.used ? 'badge badge-indigo' : 'badge badge-emerald'}>
                      {coupon.used ? '사용 완료' : '사용 가능'}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    구매일: {coupon.purchasedAt}
                  </p>

                  {!coupon.used && (
                    <button
                      onClick={() => onUseCoupon(student.id, idx)}
                      className="btn btn-gold btn-sm"
                      style={{ width: '100%' }}
                    >
                      선생님께 쿠폰 제시 (사용하기)
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
