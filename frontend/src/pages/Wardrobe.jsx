import { useState, useEffect } from 'react';
import { clothingAPI } from '../services/api';
import BottomNav from '../components/BottomNav';
import { Plus, X, Eye, EyeOff } from 'lucide-react';

const CATEGORIES = ['top', 'bottom', 'shoes', 'accessory'];
const COLORS = ['Noir', 'Blanc', 'Beige', 'Gris', 'Bleu', 'Rouge', 'Vert', 'Rose', 'Marron', 'Jaune'];

export default function Wardrobe() {
  const [clothes, setClothes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [form, setForm] = useState({ name: '', category: 'top', color: 'Noir' });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    clothingAPI.getAll().then(r => setClothes(r.data)).catch(() => {});
  }, []);

  const filtered = activeCategory === 'all' 
    ? clothes 
    : clothes.filter(c => c.category === activeCategory);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('color', form.color);
      if (photo) formData.append('photo', photo);
      const res = await clothingAPI.add(formData);
      setClothes([...clothes, res.data]);
      setShowAdd(false);
      setForm({ name: '', category: 'top', color: 'Noir' });
      setPhoto(null);
    } catch (err) {
      alert('Erreur lors de l\'ajout');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (item) => {
    try {
      const res = await clothingAPI.update(item.id, { is_active: !item.is_active });
      setClothes(clothes.map(c => c.id === item.id ? res.data : c));
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce vêtement ?')) return;
    try {
      await clothingAPI.delete(id);
      setClothes(clothes.filter(c => c.id !== id));
    } catch {}
  };

  return (
    <div style={{minHeight:'100vh', background:'white', paddingBottom:'100px'}}>
      <div style={{padding:'24px', paddingTop:'48px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
          <h1 style={{fontSize:'1.8rem', fontWeight:'900'}}>Mon Dressing</h1>
          <button
            onClick={() => setShowAdd(true)}
            style={{background:'#CBFF00', border:'none', borderRadius:'50%', width:'44px', height:'44px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}
          >
            <Plus size={20} />
          </button>
        </div>

        <div style={{display:'flex', gap:'8px', marginBottom:'24px', overflowX:'auto', paddingBottom:'4px'}}>
          {['all', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding:'8px 16px', borderRadius:'20px', border:'none', cursor:'pointer', whiteSpace:'nowrap', fontSize:'13px', fontWeight:'600',
                background: activeCategory === cat ? '#CBFF00' : '#f3f4f6',
                color: activeCategory === cat ? 'black' : '#6b7280'
              }}
            >
              {cat === 'all' ? 'Tout' : cat === 'top' ? 'Hauts' : cat === 'bottom' ? 'Bas' : cat === 'shoes' ? 'Chaussures' : 'Accessoires'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px 0', color:'#9ca3af'}}>
            <p style={{fontSize:'48px', marginBottom:'16px'}}>👗</p>
            <p style={{fontWeight:'600'}}>Aucun vêtement</p>
            <p style={{fontSize:'14px'}}>Ajoutez vos premiers vêtements</p>
          </div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
            {filtered.map(item => (
              <div key={item.id} style={{background:'#f9f9f9', borderRadius:'16px', padding:'12px', position:'relative', opacity: item.is_active ? 1 : 0.5}}>
                <div style={{background:'#e5e7eb', borderRadius:'12px', height:'120px', marginBottom:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>
                  {item.category === 'top' ? '👕' : item.category === 'bottom' ? '👖' : item.category === 'shoes' ? '👟' : '👜'}
                </div>
                <p style={{fontWeight:'700', fontSize:'13px', marginBottom:'2px'}}>{item.name}</p>
                <p style={{fontSize:'12px', color:'#9ca3af'}}>{item.color}</p>
                <div style={{display:'flex', gap:'4px', marginTop:'8px'}}>
                  <button onClick={() => toggleActive(item)} style={{flex:1, padding:'6px', borderRadius:'8px', border:'none', background:'#f3f4f6', cursor:'pointer'}}>
                    {item.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{flex:1, padding:'6px', borderRadius:'8px', border:'none', background:'#fee2e2', cursor:'pointer'}}>
                    <X size={14} color="#ef4444" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAdd && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:50}}>
          <div style={{background:'white', borderRadius:'24px 24px 0 0', padding:'24px', width:'100%', maxWidth:'430px'}}>
            <h2 style={{fontWeight:'900', fontSize:'1.2rem', marginBottom:'20px'}}>Ajouter un vêtement</h2>
            <form onSubmit={handleAdd} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
              <input
                placeholder="Nom du vêtement"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                style={{padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', outline:'none'}}
                required
              />
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                style={{padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', outline:'none'}}>
                <option value="top">Haut</option>
                <option value="bottom">Bas</option>
                <option value="shoes">Chaussures</option>
                <option value="accessory">Accessoire</option>
              </select>
              <select value={form.color} onChange={e => setForm({...form, color: e.target.value})}
                style={{padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', outline:'none'}}>
                {COLORS.map(c => <option key={c}>{c}</option>)}
              </select>
              <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])}
                style={{padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none'}} />
              <div style={{display:'flex', gap:'8px'}}>
                <button type="button" onClick={() => setShowAdd(false)}
                  style={{flex:1, padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', cursor:'pointer', fontWeight:'600'}}>
                  Annuler
                </button>
                <button type="submit" disabled={loading}
                  style={{flex:1, padding:'14px', borderRadius:'12px', background:'#CBFF00', border:'none', cursor:'pointer', fontWeight:'700'}}>
                  {loading ? '...' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
