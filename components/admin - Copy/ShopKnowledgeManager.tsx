//C:\Users\Shanon\al-rajjak-1\components\admin\ShopKnowledgeManager.tsx


 
"use client";
import React, { useState, useEffect } from 'react';

interface WelcomeMsg {
  id?: number;
  content: string;
}

export default function ShopKnowledgeManager() {
  // --- Welcome Message State ---
  const [welcomeList, setWelcomeList] = useState<WelcomeMsg[]>([]);
  const [welcomeContent, setWelcomeContent] = useState('');
  const [wLoading, setWLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { 
    fetchWelcomeMessages(); 
  }, []);

  // --- Fetch Logic ---
  const fetchWelcomeMessages = async () => {
    try {
      const res = await fetch('/api/admin/welcom');
      const data = await res.json();
      if (data.success) setWelcomeList(data.data);
    } catch (e) { console.error("Error al cargar mensajes", e); }
  };

  // --- Welcome Message Submit (Add & Edit) ---
  const handleWelcomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWLoading(true);

    const method = editingId ? 'PUT' : 'POST';
    const body = editingId 
      ? { id: editingId, content: welcomeContent } 
      : { content: welcomeContent };

    try {
      const res = await fetch('/api/admin/welcom', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        await fetchWelcomeMessages();
        setWelcomeContent('');
        setEditingId(null);
        alert(editingId ? "¡Mensaje actualizado con éxito!" : "¡Mensaje añadido con éxito!");
      }
    } catch (e) { 
      alert("Error al procesar la solicitud"); 
    } finally {
      setWLoading(false);
    }
  };

  // --- Edit Logic ---
  const startEdit = (msg: WelcomeMsg) => {
    setWelcomeContent(msg.content);
    setEditingId(msg.id!);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setWelcomeContent('');
  };

  // --- Delete Logic ---
  const deleteWelcome = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este mensaje?")) return;
    try {
      const res = await fetch(`/api/admin/welcom?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchWelcomeMessages();
    } catch (e) { alert("Error al eliminar el mensaje"); }
  };

  return (
    <div style={{ marginTop: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
      
      {/* --- WELCOME MESSAGE SECTION --- */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: '900', borderBottom: '3px solid #3b82f6', paddingBottom: '10px', color: '#3b82f6', fontSize: '18px' }}>
          {editingId ? '📝 EDITAR MENSAJE DE BIENVENIDA' : '📢 PROMOCIÓN / MENSAJE DE BIENVENIDA'}
        </h2>
        
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
          Este mensaje aparecerá en la barra superior de la tienda.
        </p>
        
        <form onSubmit={handleWelcomeSubmit} style={{ ...formCardStyle, border: editingId ? '2px solid #3b82f6' : '1px solid #e2e8f0' }}>
          <input 
            placeholder="Escribe tu oferta (ej: ¡50% de descuento hoy!)" 
            value={welcomeContent} 
            onChange={e => setWelcomeContent(e.target.value)} 
            required 
            style={inputStyle} 
          />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ ...submitBtn, background: '#3b82f6', flex: 2 }} disabled={wLoading}>
              {wLoading ? 'GUARDANDO...' : editingId ? 'ACTUALIZAR MENSAJE' : 'PUBLICAR NUEVO MENSAJE'}
            </button>
            
            {editingId && (
              <button type="button" onClick={cancelEdit} style={{ ...submitBtn, background: '#64748b', flex: 1 }}>
                CANCELAR
              </button>
            )}
          </div>
        </form>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '15px' }}>
            MENSAJES ACTIVOS
          </h3>
          
          {welcomeList.length === 0 && !wLoading && (
            <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>No hay mensajes configurados.</p>
          )}

          {welcomeList.map(msg => (
            <div key={msg.id} style={msgCardStyle}>
              <span style={{ flex: 1, color: '#334155' }}>{msg.content}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => startEdit(msg)} style={editBtnStyle}>Editar</button>
                <button onClick={() => deleteWelcome(msg.id!)} style={delBtnStyle}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// --- Styles ---
const formCardStyle: React.CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '15px', 
  background: '#f8fafc', 
  padding: '20px', 
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const inputStyle: React.CSSProperties = { 
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid #cbd5e1', 
  fontSize: '14px',
  outline: 'none',
  width: '100%'
};

const submitBtn: React.CSSProperties = { 
  color: '#fff', 
  padding: '12px', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold',
  fontSize: '14px'
};

const msgCardStyle: React.CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  background: '#fff', 
  border: '1px solid #e2e8f0', 
  padding: '12px 15px', 
  borderRadius: '10px', 
  marginBottom: '10px', 
  fontSize: '14px' 
};

const editBtnStyle: React.CSSProperties = { 
  background: '#fef3c7', 
  color: '#d97706', 
  border: 'none', 
  padding: '6px 12px', 
  borderRadius: '6px', 
  cursor: 'pointer', 
  fontSize: '12px',
  fontWeight: 'bold' 
};

const delBtnStyle: React.CSSProperties = { 
  background: '#fee2e2', 
  color: '#ef4444', 
  border: 'none', 
  padding: '6px 12px', 
  borderRadius: '6px', 
  cursor: 'pointer', 
  fontSize: '12px',
  fontWeight: 'bold' 
};