import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import Toast from './components/Toast';
import { 
  INITIAL_SETTING, 
  INITIAL_ROLES, 
  INITIAL_PRODUCTS, 
  INITIAL_STUDENTS, 
  INITIAL_LOGS 
} from './data/initialData';
import confetti from 'canvas-confetti';

export default function App() {
  // Mode state: 'teacher' | 'student'
  const [mode, setMode] = useState('teacher');

  // Currently selected student ID for student mode
  const [currentStudentId, setCurrentStudentId] = useState(1);

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('class_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTING;
  });

  // Students Data (24 students)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('class_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // Roles Data
  const [roles, setRoles] = useState(() => {
    const saved = localStorage.getItem('class_roles');
    return saved ? JSON.parse(saved) : INITIAL_ROLES;
  });

  // Products Data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('class_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Logs
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('class_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('class_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('class_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('class_roles', JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    localStorage.setItem('class_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('class_logs', JSON.stringify(logs));
  }, [logs]);

  // Body class toggle for CSS theme
  useEffect(() => {
    if (mode === 'student') {
      document.body.classList.add('student-mode');
    } else {
      document.body.classList.remove('student-mode');
    }
  }, [mode]);

  const showToastNotification = (title, message) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Give / Deduct Currency
  const handleGiveCurrency = (targetStudentIds, amount, reason) => {
    const now = new Date().toLocaleString('sv').slice(0, 16);
    let targetNames = [];

    setStudents(prev => prev.map(s => {
      if (targetStudentIds.includes(s.id)) {
        targetNames.push(s.name);
        return {
          ...s,
          balance: Math.max(0, s.balance + amount)
        };
      }
      return s;
    }));

    const logEntry = {
      id: 'l_' + Date.now(),
      timestamp: now,
      studentName: targetStudentIds.length === students.length ? '학급 전체' : targetNames.join(', '),
      type: 'currency',
      amount: amount,
      reason: reason
    };

    setLogs(prev => [logEntry, ...prev]);
    showToastNotification(
      '화폐 처리 완료', 
      `${targetNames.length}명 학생에게 ${amount > 0 ? '+' : ''}${amount} ${settings.currencyName}가 반영되었습니다.`
    );
  };

  // 2. Give EXP & Auto Level Up Calculation
  const handleGiveExp = (targetStudentIds, amount, reason) => {
    const now = new Date().toLocaleString('sv').slice(0, 16);
    let targetNames = [];
    let leveledUpStudents = [];

    setStudents(prev => prev.map(s => {
      if (targetStudentIds.includes(s.id)) {
        targetNames.push(s.name);
        let newExp = s.exp + amount;
        let newLevel = s.level;

        while (newExp >= settings.expPerLevel) {
          newExp -= settings.expPerLevel;
          newLevel += 1;
          leveledUpStudents.push({ name: s.name, level: newLevel });
        }

        return {
          ...s,
          exp: newExp,
          level: newLevel
        };
      }
      return s;
    }));

    const logEntry = {
      id: 'l_' + Date.now(),
      timestamp: now,
      studentName: targetStudentIds.length === students.length ? '학급 전체' : targetNames.join(', '),
      type: 'exp',
      amount: amount,
      reason: reason
    };

    setLogs(prev => [logEntry, ...prev]);

    if (leveledUpStudents.length > 0) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      const namesStr = leveledUpStudents.map(l => `${l.name}(Lv.${l.level})`).join(', ');
      showToastNotification('🎉 축하합니다! 레벨업 달성!', `${namesStr} 학생이 레벨업 하였습니다!`);
    } else {
      showToastNotification('경험치(EXP) 부여 완료', `${targetNames.length}명 학생에게 +${amount} EXP가 부여되었습니다.`);
    }
  };

  // 3. Update 1인 1역 Assignment
  const handleUpdateRoleAssignment = (studentId, roleId) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, roleId } : s));
    const student = students.find(s => s.id === studentId);
    const role = roles.find(r => r.id === roleId);
    showToastNotification('역할 배정 완료', `${student?.name} 학생에게 '${role?.name}' 역할이 배정되었습니다.`);
  };

  // 4. Add New Role
  const handleAddRole = (newRoleData) => {
    const newRole = {
      id: 'r_' + Date.now(),
      ...newRoleData
    };
    setRoles(prev => [...prev, newRole]);
    showToastNotification('새 1인 1역 추가 완료', `'${newRoleData.name}' 역할이 새로 등록되었습니다.`);
  };

  // 5. Add New Product
  const handleAddProduct = (newProdData) => {
    const newProduct = {
      id: 'p_' + Date.now(),
      ...newProdData
    };
    setProducts(prev => [...prev, newProduct]);
    showToastNotification('새 상품 등록 완료', `'${newProdData.name}' 상품이 등록되었습니다.`);
  };

  // 6. Delete Product
  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToastNotification('상품 삭제 완료', '선택하신 상품이 삭제되었습니다.');
  };

  // 7. Student Task Completion
  const handleCompleteTask = (studentId) => {
    const student = students.find(s => s.id === studentId);
    const role = roles.find(r => r.id === student?.roleId);
    if (!student || !role) return;

    const reward = role.reward;
    const now = new Date().toLocaleString('sv').slice(0, 16);

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          taskCompletedToday: true,
          balance: s.balance + reward
        };
      }
      return s;
    }));

    setLogs(prev => [{
      id: 'l_' + Date.now(),
      timestamp: now,
      studentName: student.name,
      type: 'currency',
      amount: reward,
      reason: `${role.name} 1인 1역 미션 수행 완료`
    }, ...prev]);

    showToastNotification('미션 성공! 🪙 보금 수령', `${reward} ${settings.currencyName}가 성공적으로 지갑에 들어왔습니다!`);
  };

  // 8. Buy Store Product
  const handleBuyProduct = (studentId, product) => {
    const now = new Date().toLocaleString('sv').slice(0, 10);
    const logTime = new Date().toLocaleString('sv').slice(0, 16);

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          balance: s.balance - product.price,
          coupons: [
            ...s.coupons,
            {
              productId: product.id,
              productName: product.name,
              purchasedAt: now,
              used: false
            }
          ]
        };
      }
      return s;
    }));

    const student = students.find(s => s.id === studentId);
    setLogs(prev => [{
      id: 'l_' + Date.now(),
      timestamp: logTime,
      studentName: student?.name || '학생',
      type: 'purchase',
      amount: -product.price,
      reason: `상점 구매: ${product.name}`
    }, ...prev]);

    showToastNotification('상점 구매 성공!', `'${product.name}' 상품을 구매하여 내 보관함에 들어왔습니다.`);
  };

  // 9. Use Coupon
  const handleUseCoupon = (studentId, couponIndex) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedCoupons = [...s.coupons];
        updatedCoupons[couponIndex] = {
          ...updatedCoupons[couponIndex],
          used: true
        };
        return { ...s, coupons: updatedCoupons };
      }
      return s;
    }));

    showToastNotification('쿠폰 사용 완료', '선생님께 쿠폰 제출이 완료되었습니다.');
  };

  // 10. Reset to Initial Data
  const handleResetData = () => {
    if (confirm('학급 전체 데이터를 초기 상태로 리셋하시겠습니까? (이 작업은 되돌릴 수 없습니다.)')) {
      localStorage.removeItem('class_settings');
      localStorage.removeItem('class_students');
      localStorage.removeItem('class_roles');
      localStorage.removeItem('class_products');
      localStorage.removeItem('class_logs');

      setSettings(INITIAL_SETTING);
      setStudents(INITIAL_STUDENTS);
      setRoles(INITIAL_ROLES);
      setProducts(INITIAL_PRODUCTS);
      setLogs(INITIAL_LOGS);

      showToastNotification('데이터 초기화 완료', '모든 학급 데이터가 기본 샘플 상태로 돌아갔습니다.');
    }
  };

  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  return (
    <div className="app-container">
      {/* Global Navigation Header */}
      <Header
        mode={mode}
        setMode={setMode}
        students={students}
        currentStudentId={currentStudentId}
        setCurrentStudentId={setCurrentStudentId}
        settings={settings}
        setSettings={setSettings}
        onResetData={handleResetData}
      />

      {/* Main View Area */}
      {mode === 'teacher' ? (
        <TeacherDashboard
          students={students}
          roles={roles}
          products={products}
          logs={logs}
          settings={settings}
          onGiveCurrency={handleGiveCurrency}
          onGiveExp={handleGiveExp}
          onUpdateRoleAssignment={handleUpdateRoleAssignment}
          onAddRole={handleAddRole}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      ) : (
        <StudentDashboard
          student={currentStudent}
          roles={roles}
          products={products}
          settings={settings}
          onCompleteTask={handleCompleteTask}
          onBuyProduct={handleBuyProduct}
          onUseCoupon={handleUseCoupon}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
