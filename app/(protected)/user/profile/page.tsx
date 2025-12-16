'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export default function ProfilePage() {
  const { user } = useAuth();
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loadingAddress, setLoadingAddress] = useState(true);
  
  const [address, setAddress] = useState({
    city: '',
    street: '',
    zipCode: ''
  });

  useEffect(() => {
    if (user) {
      const fetchAddress = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().address) {
            setAddress(docSnap.data().address);
          }
        } catch (e) {
          console.error("Błąd pobierania adresu", e);
        } finally {
            setLoadingAddress(false);
        }
      };
      fetchAddress();
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateProfile(user, {
        displayName: formData.get('displayName') as string,
        photoURL: formData.get('photoURL') as string,
      });
      setMsg({ type: 'success', text: 'Profil zaktualizowany!' });
    } catch (error: any) {
      setMsg({ type: 'error', text: error.message });
    }
  };

  const handleAddressUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        address: address
      }, { merge: true });
      
      setMsg({ type: 'success', text: 'Adres zapisany w bazie Firestore!' });
    } catch (error: any) {
      setMsg({ type: 'error', text: "Błąd zapisu: " + error.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Ustawienia Profilu</h1>

      {msg.text && (
        <div className={`p-4 rounded-lg ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {msg.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Karta 1: Dane Podstawowe (Auth) */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            👤 Dane Logowania
          </h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email (tylko do odczytu)</label>
              <input value={user?.email || ''} disabled className="input-field bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nazwa wyświetlana</label>
              <input name="displayName" defaultValue={user?.displayName || ''} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">URL Zdjęcia</label>
              <input name="photoURL" defaultValue={user?.photoURL || ''} className="input-field" placeholder="https://..." />
            </div>
            <button type="submit" className="btn-primary w-full mt-4">Aktualizuj Profil</button>
          </form>
        </div>

        {/* Karta 2: Adres (Firestore) */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            🏠 Adres (Firestore)
          </h2>
          {loadingAddress ? (
              <p>Ładowanie danych...</p>
          ) : (
            <form onSubmit={handleAddressUpdate} className="space-y-4">
                <div>
                <label className="block text-sm text-gray-600 mb-1">Ulica</label>
                <input 
                    value={address.street} 
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    className="input-field" 
                />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Kod pocztowy</label>
                        <input 
                            value={address.zipCode} 
                            onChange={(e) => setAddress({...address, zipCode: e.target.value})}
                            className="input-field" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Miasto</label>
                        <input 
                            value={address.city} 
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                            className="input-field" 
                        />
                    </div>
                </div>
                <button type="submit" className="btn-secondary w-full mt-4 border-indigo-500 text-indigo-600 hover:bg-indigo-50">
                    Zapisz Adres
                </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}